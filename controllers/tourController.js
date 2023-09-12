const fs = require('fs');
const Tour = require('../models/tourModel');
const APIFeatures = require('../utils/apiFeatures');

exports.aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingAverage,price';
  req.query.fields = 'name,price,ratingAverage,summary,difficulty';
  next();
};

// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`),
// );

// exports.checkID = (req, res, next, val) => {
//   console.log(`Tour id is: ${val}`);

//   if (req.params.id * 1 > tours.length) {
//     return res.status(404).json({
//       status: 'fail',
//       message: 'Invalid ID',
//     });
//   }
//   next();
// };

// exports.checkBody = (req, res, next) => {
//   if (!req.body.name || !req.body.price) {
//     return res.status(400).json({
//       status: 'fail',
//       message: 'Missing name or price',
//     });
//   }
//   next(); // go to the next middleware
// };

exports.getAllTours = async (req, res) => {
  try {
    // // BUILD QUERY
    // // 1A) Filtering
    // const queryObj = { ...req.query }; //  creates a new object & to make a shallow copy of the 'req.query' object
    // const excludeFields = ['page', 'sort', 'limit', 'fields']; // contains the names of certain query parameters that you want to exclude or remove from the 'queryObj'
    // excludeFields.forEach((el) => delete queryObj[el]);

    // // the queryObj object will contain all query parameters from req.query except for those specified in the excludeFields array. This can be useful when you want to filter out specific query parameters before further processing the remaining ones. For example, you might want to remove pagination-related parameters like 'page' and 'limit' before using the remaining parameters to filter database queries or generate responses.

    // // console.log('REQ QUERY', req.query, queryObj);

    // // 1B) Advanced Filter
    // let queryStr = JSON.stringify(queryObj);
    // queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    // console.log(JSON.parse(queryStr));

    // // { difficulty: 'easy', duration: { $gte: '5'} } (This is mongo schema)
    // // { difficulty: 'easy', duration: { gte: '5'} } (We need to change mongo schema, we need to inset '$' sign to operator $gte)

    // let query = Tour.find(JSON.parse(queryStr));
    // console.log('Query', query);

    // const query = await Tour.find({
    //   duration: 5,
    //   difficulty: 'easy',
    // });

    // 2) Sorting
    // if (req.query.sort) {
    //   const sortBy = req.query.sort.split(',').join(' ');
    //   console.log(sortBy);

    //   query = query.sort(sortBy);
    //   // sort('price ratingsAverage)
    // } else {
    //   query = query.sort('-createdAt');
    // }

    // 3) Field Limiting
    // if (req.query.fields) {
    //   const fields = req.query.fields.split(',').join(' ');
    //   query = query.select(fields);
    // } else {
    //   query = query.select('-__v'); // mean exclude all fields
    // }

    // 4) Pagination

    // const page = req.query.page * 1 || 1; // * 1 mean convert string to number (default 1 page)
    // const limit = req.query.limit * 1 || 100;
    // const skip = (page - 1) * limit;

    // // page=2&limit=10 (1-10 => page 1, 11-20 => page 2, 21-30 => page 3)
    // query = query.skip(skip).limit(limit); // (10 skip mean go to page 2, 20 skip mean got yo page 3 )

    // if (req.query.page) {
    //   const numTours = await Tour.countDocuments(); // (countDocument method return a promise)return the number of ducumnets
    //   if (skip > numTours) throw new Error('This page does not exist');
    // }

    // EXECUTE QUERY
    const features = new APIFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const tours = await features.query;
    // query.sort().select().skip().limit()

    // const query = await Tour.find()
    //   .where('duration')
    //   .equals(5)
    //   .where('difficulty')
    //   .equals('easy');

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
  // console.log(req.requestTime);

  // res.status(200).json({
  //   status: 'success',
  //   requestedAt: req.requestTime,
  //   results: tours.length,
  //   data: {
  //     // tours: tours(read file result 'tours')
  //     tours,
  //   },
  // });
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    // Tour.findOne({_id: req.params.id})
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }

  // console.log(req.params);

  // const id = req.params.id * 1; // convert string to number
  // const tour = tours.find((el) => el.id === id); // find array method return first element that satified condition

  // if (id > tours.length) {
  // if (!tour) {
  //   return res.status(404).json({
  //     status: 'fail',
  //     message: 'Invalid ID',
  //   });
  // }

  // res.status(200).json({
  //   status: 'success',

  //   data: {
  //     tour,
  //   },
  // });
};

exports.createTour = async (req, res) => {
  try {
    // const newTour = new Tour({})
    // newTour.save() // save fun: return a promise

    // Tour.create({}).then() // create fun: also return a promise

    const newTour = await Tour.create(req.body).then();

    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'Fail',
      message: `Invalid data set ${err}`,
    });
  }
  // console.log(req.body);
  // res.send('Done');
  // const newId = tours[tours.length - 1].id + 1;
  // const newTour = Object.assign({ id: newId }, req.body);
  // tours.push(newTour);
  // fs.writeFile(
  //   `${__dirname}/dev-data/data/tours-simple.json`,
  //   JSON.stringify(tours),
  //   (err) => {
  //     res.status(201).json({
  //       // 201 is create
  //       status: 'success',
  //       data: {
  //         tour: newTour,
  //       },
  //     });
  //   },
  // );
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }

  // patch method only partially object update (not the whole object)
  // if (req.params.id * 1 > tours.length) {
  //   return res.status(404).json({
  //     status: 'fail',
  //     message: 'Invalid ID',
  //   });
  // }

  // res.status(200).json({
  //   status: 'success to update',
  //   data: {
  //     tour: '<Updated tour...>',
  //   },
  // });
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      // 204 is no content
      status: 'success to delete',
      data: null,
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
  // res.status(204).json({
  //   // 204 is no content
  //   status: 'success to delete',
  //   data: null,
  // });
};

exports.getTourStats = async (req, res) => {
  try {
    const stats = await Tour.aggregate([
      {
        $match: { ratingAverage: { $gte: 4.5 } },
      },
      {
        $group: {
          // _id: '$ratingAverage',
          _id: { $toUpper: '$difficulty' },
          numTours: { $sum: 1 },
          numRatings: { $sum: '$ratingQuantity' },
          avgRating: { $avg: '$ratingAverage' },
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' },
        },
      },
      {
        $sort: { avgPrice: 1 },
      },
      // {
      //   $match: { _id: { $ne: 'EASY' } }, // This is exclusive not equal 'easy'
      // },
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        stats,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getMonthlyPlan = async (req, res) => {
  try {
    const year = req.params.year * 1;
    const plan = await Tour.aggregate([]);

    res.status(200).json({
      status: 'success',
      data: {
        plan,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
