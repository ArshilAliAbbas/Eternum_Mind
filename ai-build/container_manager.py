import docker

class ContainerManager:
    def init(self):
        self.client = docker.from_env()
        self.containers = {}

    def create_container(self, user_id):
        if user_id in self.containers:
            return self.containers[user_id]
        port = 8000 + len(self.containers) + 1
        container = self.client.containers.run(
            "eternum-mind-ai",
            environment={"USER_ID": user_id},
            ports={"8000/tcp": port},
            detach=True
        )
        self.containers[user_id] = {"container_id": container.id, "port": port}
        return self.containers[user_id]

    def get_container(self, user_id):
        return self.containers.get(user_id)
