"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';

const SoulPrintRadarChart: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  
  // Data for the radar chart
  const attributes = [
    { name: 'Resilience', value: 0.8 },
    { name: 'Mindfulness', value: 0.9 },
    { name: 'Creativity', value: 0.85 },
    { name: 'Empathy', value: 0.75 },
    { name: 'Focus', value: 0.7 },
    { name: 'Gratitude', value: 0.78 },
    { name: 'Adaptability', value: 0.82 },
    { name: 'Optimism', value: 0.76 }
  ];

  const drawChart = useCallback(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size with higher resolution for retina displays
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    
    // Clear canvas
    ctx.clearRect(0, 0, rect.width, rect.height);
    
    // Calculate center and radius
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const radius = Math.min(centerX, centerY) * 0.8;
    
    // Draw background circles
    const numCircles = 4;
    for (let i = 1; i <= numCircles; i++) {
      const circleRadius = (radius * i) / numCircles;
      ctx.beginPath();
      ctx.arc(centerX, centerY, circleRadius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 1;
      ctx.stroke();
    }
    
    // Draw axis lines
    const numAttributes = attributes.length;
    for (let i = 0; i < numAttributes; i++) {
      const angle = (i * 2 * Math.PI) / numAttributes - Math.PI / 2;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(x, y);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 1;
      ctx.stroke();
      
      // Draw attribute labels
      const labelRadius = radius * 1.1;
      const labelX = centerX + labelRadius * Math.cos(angle);
      const labelY = centerY + labelRadius * Math.sin(angle);
      
      ctx.font = '12px Inter, system-ui, sans-serif';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(attributes[i].name, labelX, labelY);
    }
    
    // Draw data polygon
    ctx.beginPath();
    for (let i = 0; i < numAttributes; i++) {
      const angle = (i * 2 * Math.PI) / numAttributes - Math.PI / 2;
      const value = attributes[i].value;
      const x = centerX + radius * value * Math.cos(angle);
      const y = centerY + radius * value * Math.sin(angle);
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.closePath();
    
    // Create gradient fill
    const gradient = ctx.createLinearGradient(0, 0, 0, rect.height);
    gradient.addColorStop(0, 'rgba(99, 102, 241, 0.6)');
    gradient.addColorStop(1, 'rgba(79, 70, 229, 0.2)');
    
    // Fill and stroke
    ctx.fillStyle = gradient;
    ctx.fill();
    ctx.strokeStyle = 'rgba(129, 140, 248, 0.8)';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Draw data points
    for (let i = 0; i < numAttributes; i++) {
      const angle = (i * 2 * Math.PI) / numAttributes - Math.PI / 2;
      const value = attributes[i].value;
      const x = centerX + radius * value * Math.cos(angle);
      const y = centerY + radius * value * Math.sin(angle);
      
      // Glow effect - enhanced when hovered
      const isHovered = hoveredIndex === i;
      const glowSize = isHovered ? 15 : 10;
      const pointSize = isHovered ? 6 : 5;
      const innerPointSize = isHovered ? 4 : 3;
      
      const glow = ctx.createRadialGradient(x, y, 0, x, y, glowSize);
      glow.addColorStop(0, isHovered ? 'rgba(129, 140, 248, 0.9)' : 'rgba(129, 140, 248, 0.8)');
      glow.addColorStop(1, 'rgba(129, 140, 248, 0)');
      
      ctx.beginPath();
      ctx.arc(x, y, pointSize, 0, Math.PI * 2);
      ctx.fillStyle = glow;
      ctx.fill();
      
      ctx.beginPath();
      ctx.arc(x, y, innerPointSize, 0, Math.PI * 2);
      ctx.fillStyle = isHovered ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0.9)';
      ctx.fill();
      
      // Display value when hovering
      if (isHovered) {
        ctx.font = 'bold 14px Inter, system-ui, sans-serif';
        ctx.fillStyle = 'rgba(255, 255, 255, 1)';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`${(value * 100).toFixed(0)}%`, x, y - 20);
      }
    }
  }, [hoveredIndex]);
  
  useEffect(() => {
    drawChart();
  }, [drawChart]);

  // Handle mouse interactions
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const radius = Math.min(centerX, centerY) * 0.8;
    
    // Check if mouse is near any data point
    for (let i = 0; i < attributes.length; i++) {
      const angle = (i * 2 * Math.PI) / attributes.length - Math.PI / 2;
      const value = attributes[i].value;
      const x = centerX + radius * value * Math.cos(angle);
      const y = centerY + radius * value * Math.sin(angle);
      
      const distance = Math.sqrt(Math.pow(mouseX - x, 2) + Math.pow(mouseY - y, 2));
      if (distance < 15) {
        setHoveredIndex(i);
        setIsHovering(true);
        drawChart();
        
return;
      }
    }
    
    if (isHovering) {
      setHoveredIndex(null);
      setIsHovering(false);
      drawChart();
    }
  }, [attributes, drawChart, isHovering]);
  
  const handleMouseLeave = useCallback(() => {
    setHoveredIndex(null);
    setIsHovering(false);
    drawChart();
  }, [drawChart]);

  return (
    <div className="relative aspect-square w-full max-w-[450px] transition-all duration-300 hover:scale-105">
      <canvas 
        ref={canvasRef} 
        className="size-full cursor-pointer"
        style={{ width: '100%', height: '100%' }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      />
    </div>
  );
};

export default SoulPrintRadarChart;
