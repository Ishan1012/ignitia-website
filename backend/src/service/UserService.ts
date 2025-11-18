import { IUser } from "../interface/IUser";
import { UserRepository } from "../repository/UserRepository";

export class UserService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async saveUser(user: Partial<IUser>): Promise<IUser | null> {
        return await this.userRepository.create(user);
    }

    async findUserById(id: string): Promise<IUser | null> {
        return await this.userRepository.findById(id);
    }

    async findUserByEmail(email: string): Promise<IUser | null> {
        return await this.userRepository.findByEmail(email);
    }

    async isUserVerified(id: string): Promise<boolean | null> {
        return await this.userRepository.getIsVerified(id);
    }

    async isUserPhoneVerified(id: string): Promise<boolean | null> {
        return await this.userRepository.getIsPhoneVerified(id);
    }

    async getUserByVerificationToken(id: string): Promise<IUser | null> {
        return await this.userRepository.getByVerificationToken(id);
    }

    async updateUser(id: string, updatedUser: Partial<IUser>): Promise<IUser | null> {
        if (updatedUser.profileUrl === null) {
            delete updatedUser.profileUrl;
        }

        return await this.userRepository.update(id, updatedUser);
    }

    async getAllUsers(): Promise<IUser[]> {
        return await this.userRepository.getAll();
    }

    async deleteUser(id: string): Promise<void> {
        await this.userRepository.delete(id);
    }
}