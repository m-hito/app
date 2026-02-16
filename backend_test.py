#!/usr/bin/env python3
"""
Roblox Systems Hub Backend API Test Suite
Tests all backend API endpoints including edge cases and CORS handling.
"""

import requests
import json
import sys
from typing import Dict, Any, List

# Get base URL from environment - use the public URL for testing
BASE_URL = "https://roblox-vault.preview.emergentagent.com"
API_BASE = f"{BASE_URL}/api"

def print_test_result(test_name: str, success: bool, details: str = ""):
    """Print formatted test result"""
    status = "✅ PASS" if success else "❌ FAIL"
    print(f"{status} - {test_name}")
    if details:
        print(f"    {details}")
    print()

def test_health_endpoint():
    """Test GET /api/health endpoint"""
    print("🔍 Testing GET /api/health")
    try:
        response = requests.get(f"{API_BASE}/health", timeout=10)
        
        # Check status code
        if response.status_code != 200:
            print_test_result("Health endpoint status code", False, f"Expected 200, got {response.status_code}")
            return False
            
        # Check response structure
        data = response.json()
        expected_keys = {"success", "message", "version"}
        if not all(key in data for key in expected_keys):
            print_test_result("Health endpoint response structure", False, f"Missing keys. Got: {list(data.keys())}")
            return False
            
        # Check expected values
        if data.get("success") != True:
            print_test_result("Health endpoint success field", False, f"Expected True, got {data.get('success')}")
            return False
            
        if data.get("message") != "Roblox Systems Hub API":
            print_test_result("Health endpoint message field", False, f"Expected 'Roblox Systems Hub API', got {data.get('message')}")
            return False
            
        if data.get("version") != "1.0.0":
            print_test_result("Health endpoint version field", False, f"Expected '1.0.0', got {data.get('version')}")
            return False
            
        # Check CORS headers
        cors_headers = response.headers.get('Access-Control-Allow-Origin')
        if not cors_headers:
            print_test_result("Health endpoint CORS headers", False, "Missing CORS headers")
            return False
            
        print_test_result("Health endpoint", True, f"Response: {data}")
        return True
        
    except Exception as e:
        print_test_result("Health endpoint", False, f"Request failed: {str(e)}")
        return False

def test_systems_endpoint():
    """Test GET /api/systems endpoint"""
    print("🔍 Testing GET /api/systems")
    try:
        response = requests.get(f"{API_BASE}/systems", timeout=10)
        
        # Check status code
        if response.status_code != 200:
            print_test_result("Systems endpoint status code", False, f"Expected 200, got {response.status_code}")
            return False
            
        # Check response structure
        data = response.json()
        if not isinstance(data, dict) or "success" not in data or "data" not in data:
            print_test_result("Systems endpoint response structure", False, f"Invalid structure: {data}")
            return False
            
        if data.get("success") != True:
            print_test_result("Systems endpoint success field", False, f"Expected True, got {data.get('success')}")
            return False
            
        systems_data = data.get("data", [])
        if not isinstance(systems_data, list):
            print_test_result("Systems endpoint data field", False, f"Expected list, got {type(systems_data)}")
            return False
            
        # Check if we have exactly 3 systems
        if len(systems_data) != 3:
            print_test_result("Systems count", False, f"Expected 3 systems, got {len(systems_data)}")
            return False
            
        # Check each system has required fields
        required_fields = {
            "slug", "title", "displayName", "description", "gradientFrom", 
            "gradientTo", "icon", "devNotes", "repoUrl", "ytVideo", 
            "waitTimeSeconds", "tags", "brawlNotes", "featured"
        }
        
        expected_slugs = {"movement-system", "npc-factory", "combat-system"}
        actual_slugs = {system.get("slug") for system in systems_data}
        
        if actual_slugs != expected_slugs:
            print_test_result("Systems slugs", False, f"Expected {expected_slugs}, got {actual_slugs}")
            return False
            
        for system in systems_data:
            missing_fields = required_fields - set(system.keys())
            if missing_fields:
                print_test_result(f"System {system.get('slug', 'unknown')} fields", False, f"Missing fields: {missing_fields}")
                return False
                
        # Check CORS headers
        cors_headers = response.headers.get('Access-Control-Allow-Origin')
        if not cors_headers:
            print_test_result("Systems endpoint CORS headers", False, "Missing CORS headers")
            return False
            
        print_test_result("Systems endpoint", True, f"Found {len(systems_data)} systems with all required fields")
        return True
        
    except Exception as e:
        print_test_result("Systems endpoint", False, f"Request failed: {str(e)}")
        return False

def test_individual_system_endpoints():
    """Test GET /api/systems/:slug endpoints for each system"""
    systems_to_test = ["movement-system", "npc-factory", "combat-system"]
    all_passed = True
    
    for slug in systems_to_test:
        print(f"🔍 Testing GET /api/systems/{slug}")
        try:
            response = requests.get(f"{API_BASE}/systems/{slug}", timeout=10)
            
            # Check status code
            if response.status_code != 200:
                print_test_result(f"System {slug} status code", False, f"Expected 200, got {response.status_code}")
                all_passed = False
                continue
                
            # Check response structure
            data = response.json()
            if not isinstance(data, dict) or "success" not in data or "data" not in data:
                print_test_result(f"System {slug} response structure", False, f"Invalid structure: {data}")
                all_passed = False
                continue
                
            if data.get("success") != True:
                print_test_result(f"System {slug} success field", False, f"Expected True, got {data.get('success')}")
                all_passed = False
                continue
                
            system_data = data.get("data")
            if not isinstance(system_data, dict):
                print_test_result(f"System {slug} data field", False, f"Expected dict, got {type(system_data)}")
                all_passed = False
                continue
                
            # Check slug matches
            if system_data.get("slug") != slug:
                print_test_result(f"System {slug} slug match", False, f"Expected {slug}, got {system_data.get('slug')}")
                all_passed = False
                continue
                
            # Check required fields
            required_fields = {
                "slug", "title", "displayName", "description", "gradientFrom", 
                "gradientTo", "icon", "devNotes", "repoUrl", "ytVideo", 
                "waitTimeSeconds", "tags", "brawlNotes", "featured"
            }
            
            missing_fields = required_fields - set(system_data.keys())
            if missing_fields:
                print_test_result(f"System {slug} required fields", False, f"Missing fields: {missing_fields}")
                all_passed = False
                continue
                
            # Check CORS headers
            cors_headers = response.headers.get('Access-Control-Allow-Origin')
            if not cors_headers:
                print_test_result(f"System {slug} CORS headers", False, "Missing CORS headers")
                all_passed = False
                continue
                
            print_test_result(f"System {slug}", True, f"System data retrieved successfully")
            
        except Exception as e:
            print_test_result(f"System {slug}", False, f"Request failed: {str(e)}")
            all_passed = False
            
    return all_passed

def test_nonexistent_system():
    """Test GET /api/systems/nonexistent-system should return 404"""
    print("🔍 Testing GET /api/systems/nonexistent-system (should return 404)")
    try:
        response = requests.get(f"{API_BASE}/systems/nonexistent-system", timeout=10)
        
        # Check status code
        if response.status_code != 404:
            print_test_result("Nonexistent system status code", False, f"Expected 404, got {response.status_code}")
            return False
            
        # Check response structure
        data = response.json()
        if not isinstance(data, dict) or "success" not in data or "error" not in data:
            print_test_result("Nonexistent system response structure", False, f"Invalid structure: {data}")
            return False
            
        if data.get("success") != False:
            print_test_result("Nonexistent system success field", False, f"Expected False, got {data.get('success')}")
            return False
            
        if "not found" not in data.get("error", "").lower():
            print_test_result("Nonexistent system error message", False, f"Expected 'not found' in error, got {data.get('error')}")
            return False
            
        # Check CORS headers
        cors_headers = response.headers.get('Access-Control-Allow-Origin')
        if not cors_headers:
            print_test_result("Nonexistent system CORS headers", False, "Missing CORS headers")
            return False
            
        print_test_result("Nonexistent system 404 handling", True, f"Correctly returned 404: {data}")
        return True
        
    except Exception as e:
        print_test_result("Nonexistent system", False, f"Request failed: {str(e)}")
        return False

def test_nonexistent_route():
    """Test GET /api/nonexistent-route should return 404"""
    print("🔍 Testing GET /api/nonexistent-route (should return 404)")
    try:
        response = requests.get(f"{API_BASE}/nonexistent-route", timeout=10)
        
        # Check status code
        if response.status_code != 404:
            print_test_result("Nonexistent route status code", False, f"Expected 404, got {response.status_code}")
            return False
            
        # Check response structure
        data = response.json()
        if not isinstance(data, dict) or "success" not in data or "error" not in data:
            print_test_result("Nonexistent route response structure", False, f"Invalid structure: {data}")
            return False
            
        if data.get("success") != False:
            print_test_result("Nonexistent route success field", False, f"Expected False, got {data.get('success')}")
            return False
            
        if "not found" not in data.get("error", "").lower():
            print_test_result("Nonexistent route error message", False, f"Expected 'not found' in error, got {data.get('error')}")
            return False
            
        # Check CORS headers
        cors_headers = response.headers.get('Access-Control-Allow-Origin')
        if not cors_headers:
            print_test_result("Nonexistent route CORS headers", False, "Missing CORS headers")
            return False
            
        print_test_result("Nonexistent route 404 handling", True, f"Correctly returned 404: {data}")
        return True
        
    except Exception as e:
        print_test_result("Nonexistent route", False, f"Request failed: {str(e)}")
        return False

def test_options_cors():
    """Test OPTIONS /api/systems for CORS preflight"""
    print("🔍 Testing OPTIONS /api/systems (CORS preflight)")
    try:
        response = requests.options(f"{API_BASE}/systems", timeout=10)
        
        # Check status code
        if response.status_code != 204:
            print_test_result("OPTIONS CORS status code", False, f"Expected 204, got {response.status_code}")
            return False
            
        # Check CORS headers
        required_headers = [
            'Access-Control-Allow-Origin',
            'Access-Control-Allow-Methods',
            'Access-Control-Allow-Headers'
        ]
        
        for header in required_headers:
            if not response.headers.get(header):
                print_test_result("OPTIONS CORS headers", False, f"Missing header: {header}")
                return False
                
        # Check methods include GET
        allow_methods = response.headers.get('Access-Control-Allow-Methods', '')
        if 'GET' not in allow_methods:
            print_test_result("OPTIONS CORS methods", False, f"GET not in allowed methods: {allow_methods}")
            return False
            
        print_test_result("OPTIONS CORS handling", True, f"CORS headers present: {dict(response.headers)}")
        return True
        
    except Exception as e:
        print_test_result("OPTIONS CORS", False, f"Request failed: {str(e)}")
        return False

def run_all_tests():
    """Run all backend API tests"""
    print("🚀 Starting Roblox Systems Hub Backend API Tests")
    print(f"Testing API at: {API_BASE}")
    print("=" * 60)
    
    tests = [
        test_health_endpoint,
        test_systems_endpoint, 
        test_individual_system_endpoints,
        test_nonexistent_system,
        test_nonexistent_route,
        test_options_cors
    ]
    
    passed = 0
    total = len(tests)
    
    for test_func in tests:
        try:
            if test_func():
                passed += 1
        except Exception as e:
            print(f"❌ CRITICAL ERROR in {test_func.__name__}: {str(e)}")
    
    print("=" * 60)
    print(f"📊 Test Results: {passed}/{total} tests passed")
    
    if passed == total:
        print("✅ All backend API tests PASSED!")
        return True
    else:
        print("❌ Some backend API tests FAILED!")
        return False

if __name__ == "__main__":
    success = run_all_tests()
    sys.exit(0 if success else 1)