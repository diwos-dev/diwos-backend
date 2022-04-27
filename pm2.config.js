'use strict';

module.exports = {
  apps : [{
    name   : "diwos-backend",
    script : "./index.js",
    env_production: {
       NODE_ENV: "production"
    },
    env_development: {
       NODE_ENV: "development"
    }
  }]
}
