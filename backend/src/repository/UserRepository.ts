import { IUser } from "../interface/IUser";
import Patient from "../model/User";

export class UserRepository {
    async create(patient: Partial<IUser>): Promise<IUser | null> {
        const newPatient = new Patient(patient);
        return await newPatient.save();
    }

    async findById(id: string): Promise<IUser | null> {
        return await Patient.findById(id);
    }

    async findByEmail(email: string): Promise<IUser | null> {
        return await Patient.findOne({ email }).exec();
    }

    async getIsVerified(id: string): Promise<boolean | null> {
        const patient = await Patient.findById(id).select('isVerified').lean().exec();
        return patient?.isVerified || null;
    }

    async getIsPhoneVerified(id: string): Promise<boolean> {
        const patient = await Patient.findById(id).select('isPhoneVerified').lean().exec();
        return patient?.isPhoneVerified || false;
    }

    async getByVerificationToken(verificationToken: string): Promise<IUser | null> {
        const patient = await Patient.findOne({ verificationToken }).select('-password -isOAuth -isPhoneVerified -detailsComplete -status -isAdmin').exec();
        return patient;
    }

    async update(id: string, updatedPatient: Partial<IUser>): Promise<IUser | null> {
        return await Patient.findByIdAndUpdate(id, { $set: updatedPatient }, { new: true, runValidators: true }).exec();
    }

    async getAll(): Promise<IUser[]> {
        return await Patient.find().exec();
    }

    async delete(id: string): Promise<void> {
        await Patient.findByIdAndDelete(id);
    }
}