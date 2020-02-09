from enum import Enum

class Protocol:
    def __init__(self):
        self.theme = ""
        self.organ = ""
        self.dayOneEquals = 0
        self.name = ""
        self.reevaluation = [] #
        self.jours = []


class Day:
    def ___init__(self):
        self.day = 0
        self.careMode = CareMode(0)


class CareMode(Enum):
    Admission = "hospitalisation",
    DayCare = "hdj"

class CareGalenic(Enum):
    IntraVeinous = "iv",
    PerOs = "peros",
    Distributor = "diffusor"