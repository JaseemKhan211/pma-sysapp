const ldap = require('ldapjs');
require('dotenv').config();

// Connect & bind to LDAP
function connectLDAP() {
  const client = ldap.createClient({
    url: process.env.LDAP_URL
  });

  return new Promise((resolve, reject) => {
    client.bind(process.env.LDAP_BIND_DN, process.env.LDAP_PASSWORD, (err) => {
      if (err) {
        client.unbind();
        return reject(new Error(`LDAP bind failed: ${err.message}`));
      }
      console.log('✅ LDAP bind successful');
      resolve(client);
    });
  });
}

// Search single user by sAMAccountName
async function searchUser(username) {
  const client = await connectLDAP();

  return new Promise((resolve, reject) => {
    const opts = {
      filter: `(sAMAccountName=${username})`,
      scope: 'sub',
      attributes: ['cn', 'sAMAccountName', 'mail'] // optional
    };

    client.search(process.env.LDAP_SEARCH_BASE, opts, (err, res) => {
      if (err) {
        client.unbind();
        return reject(new Error(`LDAP search failed: ${err.message}`));
      }

      const entries = [];
      res.on('searchEntry', entry => entries.push(entry.object));
      res.on('error', err => reject(err));
      res.on('end', () => {
        client.unbind();
        resolve(entries);
      });
    });
  });
}

// Search all users
async function searchAllUsers() {
  const client = await connectLDAP();

  return new Promise((resolve, reject) => {
    const opts = {
      filter: `(objectClass=user)`,
      scope: 'sub',
      attributes: ['cn', 'sAMAccountName', 'mail'] // optional
    };

    client.search(process.env.LDAP_SEARCH_BASE, opts, (err, res) => {
      if (err) {
        client.unbind();
        return reject(new Error(`LDAP search failed: ${err.message}`));
      }

      const entries = [];
      res.on('searchEntry', entry => entries.push(entry.object));
      res.on('error', err => reject(err));
      res.on('end', () => {
        client.unbind();
        resolve(entries);
      });
    });
  });
}

module.exports = {
  searchUser,
  searchAllUsers
};