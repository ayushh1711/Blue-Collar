const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying Home Services Platform Setup...\n');

const checks = {
  passed: 0,
  failed: 0,
  warnings: 0
};

function checkFile(filePath, description) {
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${description}`);
    checks.passed++;
    return true;
  } else {
    console.log(`❌ ${description} - NOT FOUND: ${filePath}`);
    checks.failed++;
    return false;
  }
}

function checkDirectory(dirPath, description) {
  if (fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory()) {
    console.log(`✅ ${description}`);
    checks.passed++;
    return true;
  } else {
    console.log(`❌ ${description} - NOT FOUND: ${dirPath}`);
    checks.failed++;
    return false;
  }
}

console.log('📁 Checking Project Structure...\n');

// Backend checks
console.log('Backend Files:');
checkDirectory('server', 'Server directory');
checkFile('server/package.json', 'Server package.json');
checkFile('server/.env.example', 'Environment example file');
checkFile('server/prisma/schema.prisma', 'Prisma schema');
checkFile('server/src/server.js', 'Server entry point');
checkFile('server/src/app.js', 'Express app');

console.log('\nBackend Controllers:');
checkFile('server/src/controllers/authController.js', 'Auth controller');
checkFile('server/src/controllers/bookingController.js', 'Booking controller');
checkFile('server/src/controllers/providerController.js', 'Provider controller');
checkFile('server/src/controllers/serviceController.js', 'Service controller');
checkFile('server/src/controllers/reviewController.js', 'Review controller');

console.log('\nBackend Routes:');
checkFile('server/src/routes/authRoutes.js', 'Auth routes');
checkFile('server/src/routes/bookingRoutes.js', 'Booking routes');
checkFile('server/src/routes/providerRoutes.js', 'Provider routes');
checkFile('server/src/routes/serviceRoutes.js', 'Service routes');
checkFile('server/src/routes/reviewRoutes.js', 'Review routes');

console.log('\nBackend Middleware:');
checkFile('server/src/middleware/auth.js', 'Auth middleware');
checkFile('server/src/middleware/errorHandler.js', 'Error handler');

// Frontend checks
console.log('\nFrontend Files:');
checkDirectory('client', 'Client directory');
checkFile('client/package.json', 'Client package.json');
checkFile('client/index.html', 'HTML entry point');
checkFile('client/vite.config.js', 'Vite config');
checkFile('client/tailwind.config.js', 'Tailwind config');
checkFile('client/src/main.jsx', 'React entry point');
checkFile('client/src/App.jsx', 'App component');

console.log('\nFrontend Pages:');
checkFile('client/src/pages/Landing.jsx', 'Landing page');
checkFile('client/src/pages/Login.jsx', 'Login page');
checkFile('client/src/pages/Signup.jsx', 'Signup page');
checkFile('client/src/pages/Services.jsx', 'Services page');
checkFile('client/src/pages/CustomerDashboard.jsx', 'Customer dashboard');
checkFile('client/src/pages/ProviderDashboard.jsx', 'Provider dashboard');
checkFile('client/src/pages/AdminDashboard.jsx', 'Admin dashboard');

console.log('\nFrontend Components:');
checkFile('client/src/components/common/Button.jsx', 'Button component');
checkFile('client/src/components/common/Input.jsx', 'Input component');
checkFile('client/src/components/common/Card.jsx', 'Card component');
checkFile('client/src/components/common/Navbar.jsx', 'Navbar component');
checkFile('client/src/components/common/Modal.jsx', 'Modal component');
checkFile('client/src/components/customer/BookingForm.jsx', 'Booking form');
checkFile('client/src/components/customer/BookingList.jsx', 'Booking list');
checkFile('client/src/components/customer/ServiceCard.jsx', 'Service card');
checkFile('client/src/components/provider/JobRequest.jsx', 'Job request');
checkFile('client/src/components/provider/ScheduleList.jsx', 'Schedule list');
checkFile('client/src/components/provider/StatusToggle.jsx', 'Status toggle');

console.log('\nFrontend Services:');
checkFile('client/src/services/api.js', 'API client');
checkFile('client/src/services/authService.js', 'Auth service');
checkFile('client/src/services/bookingService.js', 'Booking service');
checkFile('client/src/services/providerService.js', 'Provider service');
checkFile('client/src/services/serviceService.js', 'Service service');

console.log('\nFrontend State Management:');
checkFile('client/src/store/authStore.js', 'Auth store');
checkFile('client/src/store/bookingStore.js', 'Booking store');
checkFile('client/src/store/providerStore.js', 'Provider store');

console.log('\nDocumentation:');
checkFile('README.md', 'Main README');
checkFile('SETUP.md', 'Setup guide');
checkFile('QUICK_START.md', 'Quick start guide');
checkFile('FEATURES.md', 'Features documentation');
checkFile('BOOKING_SYSTEM.md', 'Booking system docs');

// Check for .env file
console.log('\n⚠️  Environment Configuration:');
if (fs.existsSync('server/.env')) {
  console.log('✅ .env file exists');
  checks.passed++;
} else {
  console.log('⚠️  .env file not found - Copy .env.example to .env and configure');
  checks.warnings++;
}

// Summary
console.log('\n' + '='.repeat(50));
console.log('📊 Verification Summary:');
console.log('='.repeat(50));
console.log(`✅ Passed: ${checks.passed}`);
console.log(`❌ Failed: ${checks.failed}`);
console.log(`⚠️  Warnings: ${checks.warnings}`);

if (checks.failed === 0 && checks.warnings === 0) {
  console.log('\n🎉 All checks passed! Your project is ready to run.');
  console.log('\n📝 Next steps:');
  console.log('1. Configure server/.env with your database credentials');
  console.log('2. Run: cd server && npm install');
  console.log('3. Run: npm run prisma:migrate');
  console.log('4. Run: node prisma/seed.js');
  console.log('5. Run: cd ../client && npm install');
  console.log('6. Start backend: cd server && npm run dev');
  console.log('7. Start frontend: cd client && npm run dev');
  console.log('\n📖 See QUICK_START.md for detailed instructions');
} else if (checks.failed === 0) {
  console.log('\n✅ Project structure is complete!');
  console.log('⚠️  Please address the warnings above before running.');
} else {
  console.log('\n❌ Some files are missing. Please check the errors above.');
}

console.log('\n');
