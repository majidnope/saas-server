import bcrypt from 'bcrypt'

export default {
    compare: async (password: string, encPass: any): Promise<boolean> => await bcrypt.compare(password, encPass),
    hash: async (value: string, round: number): Promise<string> => await bcrypt.hash(value, round)
}