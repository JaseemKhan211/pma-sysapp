const domainModel = require('../models/domainModel');

// Create Domain
exports.createDomain = async (req, res) => {
  try {
    // Validate request body
    const newDomain = await domainModel.createDomain(req.body);

    res.status(201).json({ 
        status: 'success',
        message: 'Domain created successfully 🎉',
        data: { 
            newDomain 
        }
    });
  } catch (err) {
    res.status(500).json({ 
        status: 'error', 
        message: err.message 
    });
  }
};

// Update Domain
exports.updateDomain = async (req, res) => {
  try {
    const updatedDomain = await domainModel.updateDomain(req.body);

    // If no domain is found with the provided ID
    if (!updatedDomain) {
      return res.status(404).json({ 
        status: 'error', 
        message: 'Domain not found 😢' 
      });
    }

    // If the domain is updated successfully
    res.status(200).json({ 
        status: 'success', 
        message: 'Domain updated successfully 🎉', 
        data: { 
            updatedDomain 
        }
    });
  } catch (err) {
    res.status(500).json({ 
        status: 'error', 
        message: err.message 
    });
  }
};

// Delete Domain
exports.deleteDomain = async (req, res) => {
  try {
    const { domainid } = req.params;
    await domainModel.deleteDomain(domainid);

    // If no domain is found with the provided ID
    if (!domainid) {
      return res.status(404).json({ 
        status: 'error', 
        message: 'Domain not found 😢' 
      });
    }
    
    // if the domain is deleted successfully
    res.status(200).json({ 
        status: 'success', 
        message: 'Domain deleted successfully 🎉' 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ 
        status: 'error', 
        message: err.message 
    });
  }
};

// Get Domain(s)
exports.getDomain = async (req, res) => {
  try {
    const { domainid } = req.params;
    const domains = await domainModel.getDomain(domainid);

    // If no domain is found with the provided ID
    if (!domains) {
      return res.status(404).json({ 
          status: 'error', 
          message: 'Domain not found 😢' 
      });
    }
     
    // If domains are found, return them
    res.status(200).json({ 
        status: 'success', 
        data: domains 
    });
  } catch (err) {
    res.status(500).json({ 
        status: 'error', 
        message: err.message 
    });
  }
};