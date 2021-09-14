import { PrivacyProfile } from "../models/PrivacyProfile";
import { ProfessionalProfile } from "../models/ProfessionalProfile";
import { User } from "../models/User";

interface CompleteUserDto {
    user: User,
    professionalProfile: ProfessionalProfile,
    privacy: PrivacyProfile
};

export type { CompleteUserDto }