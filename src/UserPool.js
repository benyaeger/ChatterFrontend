import { CognitoUserPool } from 'amazon-cognito-identity-js'

const poolData = {
    UserPoolId: "eu-north-1_nTz0i7Frw",
    ClientId: '3mcmmktaiiqofq0cdoglecnnn1'
}

export default new CognitoUserPool(poolData);
