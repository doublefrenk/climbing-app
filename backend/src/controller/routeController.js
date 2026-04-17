/* eslint-disable no-undef */
const Route  = require("../models/routes.js");
const catchAsync = require("../utilis/catchAsync.js");
const mongoose = require("mongoose");

exports.getAllRoutes = catchAsync( async (req, res) => {
    const routes = await Route.find();
    res.json({
      success: true,
      routes: {
        boulder: routes.filter(route => route.type === 'boulder'),
        sport: routes.filter(route => route.type === 'sport'),
        gymRoutes: routes.filter(route => route.type === 'gymRoutes')
      },
      message: 'Routes retrieved successfully'
    })
})

exports.getRouteById = catchAsync(async (req, res) => {
    const route = await Route.findOne({id: req.params.id})
    res.json({
      success: true,
      route,
      message: 'Route retrieved successfully'
    })
})

exports.updateRoute = catchAsync(async (req, res) => {
    const updatedRoute = await Route.findOneAndUpdate({id: req.params.id}, req.body, { new: true, runValidators: true });

    if (!updatedRoute) {
        throw new AppError('Route not found', 404);
    }
    
    res.json({
      success: true,
      route: updatedRoute,
      message: 'Route updated successfully'
    })
})

exports.deleteRoute = catchAsync(async (req, res) => {
    const id = parseInt(req.params.id);
    await Route.findOneAndDelete({id});
    res.json({
      success: true,
      message: 'Route deleted successfully'
    })
})

exports.createRoute = catchAsync(async (req, res) => {
    const lastIdRoute = await Route.findOne().sort({id: -1});
    const newId = lastIdRoute ? lastIdRoute.id + 1 : 1;
    const newRoute = await Route.create({...req.body, id: newId});
    res.json({
      success: true,
      route: newRoute,
      message: 'Route created successfully'
    })
})

exports.getGradeStats = catchAsync(async (req, res) => {
    const userId = req.params.id;
    const stats = await Route.aggregate([
      {
        $match:{
          users: new mongoose.Types.ObjectId(userId)
        }
      },
      {
        $group: {
          _id: {
            grade: "$grade",
            type: "$type"
          },
          routes: {
            $push: {
              title: "$title",
              sector: "$sector",
              rating: "$rating",
              attempts: "$attempts",
              sendDate: {
                $dateToString: {
                  format: "%Y-%m-%d",
                  date: "$sendDate"
                }
              },
              type: "$type",
              comments: "$comments",
              grade: "$grade",
              genre:"$genre"
            }
          },
          totalRoutes: { $sum: 1 },
          avgAttempts: { $avg: "$attempts" },
          minAttempts: { $min: "$attempts" },
          maxAttempts: { $max: "$attempts" },
          avgRating: { $avg: "$rating" },
          minRating: { $min: "$rating" },
          maxRating: { $max: "$rating" },
        }
      },
      {
        $sort: { "_id": 1 }
      },
      {
        $project: {
          grade: "$_id.grade",
          type: "$_id.type",
          statistics: {
            totalRoutes: "$totalRoutes",
            avgAttempts: { $round: ["$avgAttempts", 2] },
            minAttempts: "$minAttempts",
            maxAttempts: "$maxAttempts",
            avgRating: { $round: ["$avgRating", 2] },
            minRating: "$minRating",
            maxRating: "$maxRating"
          },
          routes: "$routes",
          extremes: {
            routesWithMinAttempts: {
              $filter: {
                input: "$routes",
                cond: { $eq: ["$$this.attempts", "$minAttempts"] }
              }
            },
            routesWithMaxAttempts: {
              $filter: {
                input: "$routes",
                cond: { $eq: ["$$this.attempts", "$maxAttempts"] }
              }
            },
            routesWithMinRating: {
              $filter: {
                input: "$routes",
                cond: { $eq: ["$$this.rating", "$minRating"] }
              }
            },
            routesWithMaxRating: {
              $filter: {
                input: "$routes",
                cond: { $eq: ["$$this.rating", "$maxRating"] }
              }
            }
          },
          _id: 0
        }
      }
    ]);
    res.json({
      success: true,
      gradeStats: stats,
      message: 'Grade statistics retrieved successfully'
    });
})

exports.getDateStats = catchAsync( async (req, res) => {
    const userId = req.params.id;

    const stats = await Route.aggregate([
      {
        $match:{
          users: new mongoose.Types.ObjectId(userId)
        }
      },
      {
        $group: {
          _id: {
            type: "$type",
            month: { $month: "$sendDate" },
            year: { $year: "$sendDate"}
          },
          routes: { $sum: 1 }
        }
      },
      {
        $project: {
          type: "$_id.type",
          year: "$_id.year",
          month: "$_id.month",
          monthName: {
            $arrayElemAt: [
              ["", "January", "February", "March", "April", "May", "June",
               "July", "August", "September", "October", "November", "December"],
              "$_id.month"
            ]
          },
           routes: 1,
          _id: 0
        }
      },
      {
        $group: {
          _id: "$type",
          monthlyData: {
            $push: {
              monthName: "$monthName",
              routes: "$routes",
              year: "$year",
              month: "$month"
            }
          }
        }
      },
      {
        $project: {
          type: "$_id",
          monthlyData: {
            $sortArray: {
              input: "$monthlyData",
              sortBy: { year: 1, month: 1 }
            }
          },
          _id: 0
        }
      }
    ]);

    const result = {};
    stats.forEach(stat => {
      result[stat.type] = stat.monthlyData.map(data => ({
        monthName: data.monthName,
        routes: data.routes
      }));
    });

    res.json({
      success: true,
      dateStats: result,
      message: 'Date statistics retrieved successfully'
    })
})
