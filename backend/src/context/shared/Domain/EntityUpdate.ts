export interface pipeline {
    $match?: object;
    $project?: object;
    $limit?: number;
    $sort?: object;
    $group?: object;
    $unwind?: string;
    $replaceRoot?: object;
    $addFields?: object;
    $skip?: number;
}
export interface Update {
    $set?: object;
    $push?: object;
    $pull?: object;
    $inc?: object;
}
