import makePipe, { Pipe } from '../src/makePipe'

type Params = {

}

// A failing Pipe action
const failingAction = (params: Params): Promise<Pipe> => {
  return makePipe({ 'greet': ['greet not supplied', 'greet must be in french']}, (): Params => {
    const response = params
    return response
  })
}

// A passing Pipe action
const passingAction = (params: Params): Promise<Pipe> => {
  return makePipe(undefined, (): Params => {
    const response = params
    return response
  })
}


describe('A Pipe', () =>{
  test('Throws an error if validation fails', async() => {
    await expect(failingAction({})).rejects.toThrow()
  })

  test('Correct error is thrown, if validation fails', async () => {
    await expect(failingAction({})).rejects.toThrowError(/^PIPELINE: GREET NOT SUPPLIED$/)
  })

  test('Does not throw an error if validation passes', async () => {
    await expect(passingAction({})).resolves
  })

  test('Returns the origial values supplied to it', async () => {
    const param = { name: 'jim' }
    await expect(passingAction(param)).resolves.toBe(param)
  })
})