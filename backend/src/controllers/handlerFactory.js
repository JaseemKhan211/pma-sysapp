const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.createOne = Model =>
    catchAsync(async (req, res, next) => {
        // Create a new document using the provided model and request body
        // The `create` method will validate the request body against the model's schema
        const doc = await Model.create(req.body);

        // If the document is created successfully, return it with a 201 status code
        res.status(201).json({
            status: 'success',
            data: {
                data: doc
            }
        });
  });

exports.updateOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    // If no document is found, return a 404 error
    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    // If the document is found, return it with a 200 status code
    res.status(200).json({
      status: 'success',
      data: {
        data: doc
      }
    });
  });

exports.deleteOne = Model =>
  catchAsync(async (req, res, next) => {

    // Find the document by ID and delete it
    // The `findByIdAndDelete` method returns the deleted document
    const doc = await Model.findByIdAndDelete(req.params.id);

    // If no document is found, return a 404 error
    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    // If the document is found, return it with a 204 status code
    res.status(204).json({
      status: 'success',
      data: null
    });
  });

exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {

    // Find the document by ID and populate it if popOptions are provided
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);

    // Execute the query to find the document
    const doc = await query;

    // If no document is found, return a 404 error
    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    // If the document is found, return it with a 200 status code
    res.status(200).json({
      status: 'success',
      data: {
        data: doc
      }
    });
  });
