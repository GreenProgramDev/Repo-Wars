import { Octokit } from '@octokit/core'

const token = import.meta.env.GITHUB_TOKEN
const octokit = new Octokit({ auth: token })

export default octokit