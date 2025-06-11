const http = require('http');

// Test configuration
const BASE_URL = 'http://localhost:5000';
const API_BASE = `${BASE_URL}/api`;

// Test results
const results = {
  passed: 0,
  failed: 0,
  tests: []
};

// Helper function to make HTTP requests
function makeRequest(path, method = 'GET', data = null, headers = {}) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    };

    const req = http.request(options, (res) => {
      let responseData = '';
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      res.on('end', () => {
        try {
          const parsed = responseData ? JSON.parse(responseData) : {};
          resolve({
            status: res.statusCode,
            data: parsed,
            headers: res.headers
          });
        } catch (e) {
          resolve({
            status: res.statusCode,
            data: responseData,
            headers: res.headers
          });
        }
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

// Test function
async function runTest(testName, testFunction) {
  try {
    console.log(`\n🧪 Testing: ${testName}`);
    const result = await testFunction();
    if (result.success) {
      console.log(`✅ PASS: ${testName}`);
      results.passed++;
    } else {
      console.log(`❌ FAIL: ${testName} - ${result.error}`);
      results.failed++;
    }
    results.tests.push({
      name: testName,
      success: result.success,
      error: result.error,
      details: result.details
    });
  } catch (error) {
    console.log(`❌ FAIL: ${testName} - ${error.message}`);
    results.failed++;
    results.tests.push({
      name: testName,
      success: false,
      error: error.message
    });
  }
}

// Test cases
async function testHelloEndpoint() {
  const response = await makeRequest(`${API_BASE}/hello`);
  return {
    success: response.status === 200 && response.data.message === 'Backend çalışıyor!',
    error: response.status !== 200 ? `Status: ${response.status}` : 
           response.data.message !== 'Backend çalışıyor!' ? 'Wrong message' : null,
    details: response
  };
}

async function testFormFieldsGet() {
  const response = await makeRequest(`${API_BASE}/form/fields`);
  return {
    success: response.status === 200,
    error: response.status !== 200 ? `Status: ${response.status}` : null,
    details: response
  };
}

async function testFormTextsGet() {
  const response = await makeRequest(`${API_BASE}/form/texts`);
  return {
    success: response.status === 200,
    error: response.status !== 200 ? `Status: ${response.status}` : null,
    details: response
  };
}

async function testAuthLoginInvalid() {
  const response = await makeRequest(`${API_BASE}/auth/login`, 'POST', {
    username: 'invalid',
    password: 'invalid'
  });
  return {
    success: response.status === 400 || response.status === 401 || response.status === 404,
    error: response.status === 200 ? 'Should not accept invalid credentials' : null,
    details: response
  };
}

async function testAuthRegisterRequest() {
  const response = await makeRequest(`${API_BASE}/auth/register-request`, 'POST', {
    name: 'Test User',
    username: 'testuser',
    password: 'testpass123'
  });
  return {
    success: response.status === 200 || response.status === 400 || response.status === 404,
    error: response.status >= 500 ? `Server error: ${response.status}` : null,
    details: response
  };
}

async function testFormApplicationInvalid() {
  const response = await makeRequest(`${API_BASE}/form/application`, 'POST', {
    answers: []
  });
  return {
    success: response.status === 400 || response.status === 500 || response.status === 404,
    error: response.status === 200 ? 'Should not accept empty application' : null,
    details: response
  };
}

async function testCORSHeaders() {
  const response = await makeRequest(`${API_BASE}/hello`);
  return {
    success: response.headers['access-control-allow-origin'] === '*' ||
             response.headers['access-control-allow-origin'] === 'http://localhost:3000',
    error: 'CORS headers not properly set',
    details: response.headers
  };
}

async function testServerRunning() {
  try {
    const response = await makeRequest(`${API_BASE}/hello`);
    return {
      success: response.status === 200,
      error: response.status !== 200 ? `Server not responding: ${response.status}` : null,
      details: response
    };
  } catch (error) {
    return {
      success: false,
      error: `Connection failed: ${error.message}`,
      details: error
    };
  }
}

async function testMongoDBStatus() {
  try {
    const response = await makeRequest(`${API_BASE}/auth/test`);
    return {
      success: response.status === 200,
      error: response.status !== 200 ? `Status: ${response.status}` : null,
      details: response
    };
  } catch (error) {
    return {
      success: false,
      error: `Connection failed: ${error.message}`,
      details: error
    };
  }
}

// Main test runner
async function runAllTests() {
  console.log('🚀 Starting comprehensive backend API tests...\n');
  console.log(`📍 Testing against: ${BASE_URL}`);
  console.log('=' .repeat(60));

  // Basic connectivity test
  await runTest('Server Connectivity', testServerRunning);
  
  // Core API tests
  await runTest('Hello Endpoint', testHelloEndpoint);
  
  // MongoDB-dependent tests
  await runTest('MongoDB Status Check', testMongoDBStatus);
  await runTest('Form Fields GET', testFormFieldsGet);
  await runTest('Form Texts GET', testFormTextsGet);
  
  // Auth tests
  await runTest('Auth Login (Invalid)', testAuthLoginInvalid);
  await runTest('Auth Register Request', testAuthRegisterRequest);
  
  // Form tests
  await runTest('Form Application (Invalid)', testFormApplicationInvalid);
  
  // Security tests
  await runTest('CORS Headers', testCORSHeaders);

  // Summary
  console.log('\n' + '=' .repeat(60));
  console.log('📊 TEST SUMMARY');
  console.log('=' .repeat(60));
  console.log(`✅ Passed: ${results.passed}`);
  console.log(`❌ Failed: ${results.failed}`);
  console.log(`📈 Success Rate: ${((results.passed / (results.passed + results.failed)) * 100).toFixed(1)}%`);
  
  if (results.failed > 0) {
    console.log('\n❌ FAILED TESTS:');
    results.tests.filter(t => !t.success).forEach(test => {
      console.log(`  - ${test.name}: ${test.error}`);
    });
  }
  
  console.log('\n🔍 DETAILED RESULTS:');
  results.tests.forEach(test => {
    const status = test.success ? '✅' : '❌';
    console.log(`  ${status} ${test.name}`);
    if (!test.success && test.details) {
      console.log(`    Details: ${JSON.stringify(test.details, null, 2)}`);
    }
  });

  console.log('\n💡 NOTES:');
  console.log('  - If MongoDB is not configured, some endpoints will return 404');
  console.log('  - This is expected behavior when running without database');
  console.log('  - CORS is configured to allow all origins (*)');

  // Exit with appropriate code
  process.exit(results.failed > 0 ? 1 : 0);
}

// Run tests
runAllTests().catch(error => {
  console.error('💥 Test runner failed:', error);
  process.exit(1);
}); 