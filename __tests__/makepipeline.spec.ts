import makePipeline from '../src/makePipeline';
import makePipe, { Pipe } from '../src/makePipe'

type Params = {
  readonly name: string
  readonly age: string
}

const pipeFail = (params: Params): Promise<Pipe> => {
  return makePipe({ 'greet': ['1st failure', '2nd failure'] }, (): Params => {
    const response = params
    return response
  })
}

const pipePass = (params: Params): Promise<Pipe> => {
  return makePipe(undefined, (): Params => {
    const response = params
    return response
  })
}

const passingPipe = () => {
  return makePipeline([
    async (params: Params) => {
      const response = await pipePass(params)
      return response
    },
    async (params: Params) => {
      const response = await pipePass(params)
      return response
    },
    async (params: Params) => {
      const response = await pipePass(params)
      return response
    }
  ])
}

const failingPipe = () => {
  return makePipeline([
    async (params: Params) => {
      const response = await pipePass(params)
      return response
    },
    async (params: Params) => {
      const response = await pipeFail(params)
      return response
    },
    async (params: Params) => {
      const response = await pipePass(params)
      return response
    }
  ])
}

describe('A Pipeline', () => {
  test('Parameters are passed through the pipeline', async () => {
    const pipe = passingPipe()
    const params = { name: 'bob' }
    await expect(pipe(params)).resolves.toBe(params)
  })

  test('A pipeline can be started without initial parameters', async () => {
    const pipe = passingPipe()
    await expect(pipe()).resolves
  })

  test('An Error is thrown if any pipe action fails', async () => {
    const pipe = failingPipe()
    const params = { name: 'bob' }
    await expect(pipe(params)).rejects.toThrow()
  })
})