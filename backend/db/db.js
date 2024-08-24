"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Spaces = exports.Users = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const node_schedule_1 = __importDefault(require("node-schedule"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mongoUri = process.env.MONGO_URI;
mongoose_1.default.connect(mongoUri);
//UsersSchema
const UserSchema = new mongoose_1.default.Schema({
    Username: { type: String, required: true },
    Email: { type: String, required: true, unique: true },
    Password: { type: String, required: true },
    Spaces: [mongoose_1.default.Schema.ObjectId] // Define the type of elements in the array
});
// Spaces Schema
const SpacesSchema = new mongoose_1.default.Schema({
    Title: { type: String, default: 'Chilling Session', required: true },
    Description: { type: String, default: 'Shorter description', required: true },
    Venue: { type: String, default: 'Seminar hall', required: true },
    Subject: { type: String, default: 'Seminar hall', required: true },
    FromTime: { type: Date, default: () => new Date() },
    ToTime: { type: Date, default: () => new Date(new Date().getTime() + 60 * 60000) }, // Default to 60 minutes later
    Expiry: { type: Date, default: () => new Date(new Date().getTime() + 24 * 60 * 60 * 1000) } // Default to 1 day later
});
exports.Users = mongoose_1.default.model('User', UserSchema);
exports.Spaces = mongoose_1.default.model('Space', SpacesSchema);
// Scheduling a job to run daily at midnight to remove expired spaces
node_schedule_1.default.scheduleJob('0 0 * * *', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const now = new Date();
        try {
            const result = yield exports.Spaces.deleteMany({ Expiry: { $lt: now } });
            console.log(`Removed ${result.deletedCount} expired spaces.`);
        }
        catch (error) {
            console.error('Error removing expired spaces:', error);
            try {
                console.log(`Error removing spaces first time retrying the process...`);
                const result = yield exports.Spaces.deleteMany({ Expiry: { $lt: now } });
                console.log(`Removed ${result.deletedCount} expired spaces.`);
            }
            catch (e) {
                console.log(`Error removing spaces second time and stopping the process...`);
            }
        }
    });
});
