const Network = require('../models/Network')
const Artifacts = require('../models/Artifacts')
const CourtProvider = require('../models/CourtProvider')

module.exports = async function () {
  const { network: networkName, court: courtAddress } = require('yargs')
    .option('c', { alias: 'court', describe: 'Court address', type: 'string' })
    .option('n', { alias: 'network', describe: 'Network name', type: 'string' })
    .argv

  const network = new Network(networkName)
  const { web3, provider, defaults } = await network.load()
  const artifacts = new Artifacts(provider, defaults)

  const courtProvider = new CourtProvider(web3, artifacts)
  const court = await courtProvider.call(courtAddress)

  return { web3, court }
}
