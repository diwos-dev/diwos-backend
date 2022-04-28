'use strict';

module.exports = {
  apps : [{
    name   : "diwos-backend",
    script : "npm",
	args : "start",
	autorestart : false,
    env_production: {
       NODE_ENV: "production"
    },
    env_development: {
       NODE_ENV: "development"
    }
  }]
}
