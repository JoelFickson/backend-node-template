import { Schema,model, Model } from "mongoose"
import {UserAccountT} from "../../../@types/users";

const accountModel = new Schema<UserAccountT>({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    }

})


const userAccount: Model<UserAccountT> = model('users', accountModel)

export default userAccount
