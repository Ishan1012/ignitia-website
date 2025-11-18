import { Schema, model } from 'mongoose';
import { IUser } from '../interface/IUser';

const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        reqiured: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: false
    },
    isOAuth: {
        type: Boolean,
        default: false
    },
    detailsComplete: {
        type: Boolean,
        default: false,
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'blocked', 'suspended', 'deleted'],
        default: 'active'
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationToken: {
        type: String,
        required: function (this: IUser) {
            return !this.isVerified;
        },
    },
    profileUrl: {
        type: String,
        default: '/images/user-default.jpg',
    },
    age: {
        type: Number,
        required: function (this: IUser) {
            return this.detailsComplete;
        }
    },
    phone: {
        type: String,
        required: function (this: IUser) {
            return this.detailsComplete;
        }
    },
    isPhoneVerified: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

const User = model<IUser>('Patient', userSchema);

export default User;