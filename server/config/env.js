const requiredKeys = [
  'RECEPTIONIST_KEY',
  'SAFETY_KEY',
  'OBSERVER_KEY'
];

function getRaceDurationSeconds() {
  return process.env.NODE_ENV === 'development' ? 60 : 600;
}

function validateEnv() {
  const missing = requiredKeys.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    console.error('Missing required environment variables:');
    missing.forEach((key) => console.error(`- ${key}`));
    console.error('');
    console.error('Example:');
    console.error('export RECEPTIONIST_KEY=1');
    console.error('export SAFETY_KEY=2');
    console.error('export OBSERVER_KEY=3');
    console.error('npm start');
    process.exit(1);
  }
}

module.exports = {
  validateEnv,
  PORT: process.env.PORT || 3000,
  RECEPTIONIST_KEY: process.env.RECEPTIONIST_KEY,
  SAFETY_KEY: process.env.SAFETY_KEY,
  OBSERVER_KEY: process.env.OBSERVER_KEY,
  RACE_DURATION_SECONDS: getRaceDurationSeconds()
};