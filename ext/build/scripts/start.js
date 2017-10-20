const logger = require('../lib/logger')('ufp-start')

logger.info('Starting server...')
require('../server/main')
    .listen(3000, () => {
        logger.mark('Server is running at http://localhost:3000')
    })
