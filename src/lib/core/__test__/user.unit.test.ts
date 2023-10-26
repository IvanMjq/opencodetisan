import {faker} from '@faker-js/faker'
import {prismaMock} from '@/lib/db/prisma-mock-singleton'
import {
  createUserToken,
  getPasswordRecoveryToken,
  getUserByEmail,
  getUserForAuth,
  updateUserPassword,
} from '../user'
import {UserRole} from '@/enums'

const uuid = faker.string.uuid()
const text = faker.lorem.text()
const date = faker.date.anytime()
const number = faker.number.int()

const user = {
  id: uuid,
  name: text,
  email: text,
  emailVerified: null,
  image: null,
  role: UserRole.Recruiter,
}

const passwordRecoveryToken = {
  id: uuid,
  token: uuid,
  isRecovered: true,
  createdAt: date,
  expiredAt: date,
  userId: uuid,
}

describe('User module', () => {
  test('createUserToken function should save the new password recovery token', async () => {
    const param: any = {
      email: text,
      token: text,
      expiredAt: date,
    }
    prismaMock.user.update.mockResolvedValue(user)
    const savedQuiz = await createUserToken(param)
    expect(savedQuiz).toEqual(user)
  })

  test('Missing email parameter should raise an missing email error', async () => {
    const param: any = {
      // email: text,
      token: text,
      expiredAt: date,
    }
    expect(async () => await createUserToken(param)).rejects.toThrow(
      /^missing email$/,
    )
  })

  test('Missing token parameter should raise an missing token error', async () => {
    const param: any = {
      email: text,
      // token: text,
      expiredAt: date,
    }
    expect(async () => await createUserToken(param)).rejects.toThrow(
      /^missing token$/,
    )
  })

  test('Missing expiredAt parameter should raise an missing expiredAt error', async () => {
    const param: any = {
      email: text,
      token: text,
      // expiredAt: date,
    }
    expect(async () => await createUserToken(param)).rejects.toThrow(
      /^missing expiredAt$/,
    )
  })

  test('getUserByEmail function should return user by email', async () => {
    const param: any = {
      email: text,
    }
    prismaMock.user.findUnique.mockResolvedValue(user)
    const result = await getUserByEmail(param)
    expect(result).toEqual(user)
  })

  test('Missing email parameter should raise an missing email error', async () => {
    const param: any = {
      // email: text,
    }
    expect(async () => await getUserByEmail(param)).rejects.toThrow(
      /^missing email$/,
    )
  })

  test('getUserforAuth function should return user by email', async () => {
    const param: any = {
      email: text,
    }
    prismaMock.user.findUnique.mockResolvedValue(user)
    const result = await getUserForAuth(param)
    expect(result).toEqual(user)
  })

  test('Missing email parameter should raise an missing email error', async () => {
    const param: any = {
      // email: text,
    }
    expect(async () => await getUserForAuth(param)).rejects.toThrow(
      /^missing email$/,
    )
  })

  test('updateUserPassword function should update user password and return token data', async () => {
    const param: any = {
      token: uuid,
      encryptedPassword: text,
    }
    prismaMock.passwordRecoveryToken.update.mockResolvedValue(
      passwordRecoveryToken,
    )
    const result = await updateUserPassword(param)
    expect(result).toEqual(passwordRecoveryToken)
  })

  test('Missing token parameter should raise an missing token error', async () => {
    const param: any = {
      // token: uuid,
      encryptedPassword: text,
    }
    expect(async () => await updateUserPassword(param)).rejects.toThrow(
      /^missing token$/,
    )
  })

  test('Missing password parameter should raise an missing password error', async () => {
    const param: any = {
      token: uuid,
      // password: text,
    }
    expect(async () => await updateUserPassword(param)).rejects.toThrow(
      /^missing encryptedPassword$/,
    )
  })

  test('getPasswordRecoveryToken function should update user password and return token data', async () => {
    const param: any = {
      token: uuid,
    }
    prismaMock.passwordRecoveryToken.findUnique.mockResolvedValue(
      passwordRecoveryToken,
    )
    const result = await getPasswordRecoveryToken(param)
    expect(result).toEqual(passwordRecoveryToken)
  })

  test('Missing token parameter should raise an missing token error', async () => {
    const param: any = {
      // token: uuid,
    }
    expect(async () => await getPasswordRecoveryToken(param)).rejects.toThrow(
      /^missing token$/,
    )
  })
})
