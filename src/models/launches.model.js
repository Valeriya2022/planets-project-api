const launches = require('./launches.mongo');
const planets = require('./planets.mongo');

const DEFAULT_FLIGHT_NUMBER = 100 ;

const launch = {
  flightNumber: 100,
  mission: 'Kepler Exploration X',
  rocket: 'Explorer IS1',
  launchDate: new Date('December 27, 2030'),
  target: 'Kepler-442 b',
  customer: ['NASA', 'ZTM'],
  upcoming: true,
  success: true,
}

async function getAllLaunches(){
  return launches
    .find({}, {'_id': 0, '__v': 0})
}

async function getLatestFlightNumber(){
  const latestLaunch = await launches.findOne().sort('-flightNumber')
  if (!latestLaunch){
    return DEFAULT_FLIGHT_NUMBER ;
  }
  return latestLaunch.flightNumber;
}

async function saveLaunch(launch){
  const planet = await planets.findOne({
    keplerName: launch.target
  });

  if (!planet){
     throw new Error('No matching planet found ')
  }
  await launches.updateOne( {
    flightNumber: launch.flightNumber
  }, launch, {upsert: true})
}

saveLaunch(launch);

async function scheduleNewLaunch(launch){
  const newFlightNumber = await getLatestFlightNumber() + 1;
   const newLaunch = Object.assign(launch, {
     success: true,
     upcoming: true,
     customers: ['ZTM', 'NASA'],
     flightNumber: newFlightNumber ,
   })

  await saveLaunch(newLaunch);
}

function existsLaunchWithId(launchId){
  return launches.has(launchId);
}

function abortLaunchById(launchId){
  const aborted = launches.get(launchId);
  aborted.success = false;
  aborted.upcoming = false;
  return aborted;
}

module.exports = {
  getAllLaunches,
  existsLaunchWithId,
  scheduleNewLaunch,
  abortLaunchById,
}