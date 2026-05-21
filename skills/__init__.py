class Skill:
    name: str = ""
    description: str = ""
    
    @staticmethod
    def match(command: str) -> bool:
        raise NotImplementedError
    
    @staticmethod
    def run(command: str) -> str:
        raise NotImplementedError