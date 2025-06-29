import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, User, Building, Shield, CreditCard, Users, Upload, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    // KYC fields
    idNumber: '',
    idType: '',
    address: '',
    city: '',
    state: '',
    // Professional fields
    licenseNumber: '',
    companyName: '',
    experience: '',
    specialization: ''
  });

  const userTypes = [
    {
      id: 'buyer',
      title: 'Property Buyer',
      description: 'Looking to purchase properties',
      icon: User,
      color: 'bg-blue-100 text-blue-700',
      features: ['Access to verified listings', 'AI-powered recommendations', 'Secure payment options']
    },
    {
      id: 'renter',
      title: 'Property Renter',
      description: 'Looking to rent properties',
      icon: Building,
      color: 'bg-green-100 text-green-700',
      features: ['Rental listings', 'Quick application process', 'Tenant protection']
    },
    {
      id: 'agent',
      title: 'Real Estate Agent',
      description: 'Professional property agent',
      icon: Shield,
      color: 'bg-purple-100 text-purple-700',
      features: ['List properties', 'Manage clients', 'Earn commissions']
    },
    {
      id: 'owner',
      title: 'Property Owner',
      description: 'Own and list properties',
      icon: CreditCard,
      color: 'bg-amber-100 text-amber-700',
      features: ['List your properties', 'Manage bookings', 'Receive payments']
    },
    {
      id: 'professional',
      title: 'Service Professional',
      description: 'Lawyer, Surveyor, Engineer, etc.',
      icon: Users,
      color: 'bg-indigo-100 text-indigo-700',
      features: ['Offer services', 'Client bookings', 'Professional profile']
    }
  ];

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step === 1 && userType) {
      setStep(2);
    } else if (step === 2 && formData.firstName && formData.email && formData.password) {
      setStep(3);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', { userType, formData });
    // Handle form submission
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Back to Home */}
        <div className="flex items-center mb-8">
          <Link to="/" className="flex items-center text-blue-700 hover:text-blue-800 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= stepNumber ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {step > stepNumber ? <CheckCircle className="h-4 w-4" /> : stepNumber}
                </div>
                {stepNumber < 3 && (
                  <div className={`w-16 h-1 mx-2 ${step > stepNumber ? 'bg-blue-600' : 'bg-gray-200'}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-12 h-12 bg-blue-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">RH</span>
              </div>
              <span className="text-2xl font-bold text-gray-900">Real Estate Hotspot</span>
            </div>
            <CardTitle className="text-xl">
              {step === 1 && 'Choose Your Account Type'}
              {step === 2 && 'Create Your Account'}
              {step === 3 && 'Complete Your Profile'}
            </CardTitle>
            <p className="text-gray-600">
              {step === 1 && 'Select the type of account that best describes your needs'}
              {step === 2 && 'Enter your basic information to create your account'}
              {step === 3 && 'Complete your profile to get verified and start using our platform'}
            </p>
          </CardHeader>

          <CardContent className="p-6">
            {/* Step 1: User Type Selection */}
            {step === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {userTypes.map((type) => (
                  <Card
                    key={type.id}
                    className={`cursor-pointer transition-all hover:shadow-lg ${
                      userType === type.id ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                    }`}
                    onClick={() => setUserType(type.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${type.color}`}>
                          <type.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{type.title}</h3>
                          <p className="text-sm text-gray-600">{type.description}</p>
                        </div>
                      </div>
                      <ul className="space-y-1">
                        {type.features.map((feature, index) => (
                          <li key={index} className="text-xs text-gray-600 flex items-center">
                            <CheckCircle className="h-3 w-3 mr-1 text-green-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Step 2: Basic Information */}
            {step === 2 && (
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="Enter your email address"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="Enter your phone number"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      placeholder="Create a password"
                    />
                  </div>
                  <div>
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      placeholder="Confirm your password"
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked) => handleInputChange('agreeToTerms', checked as boolean)}
                  />
                  <Label htmlFor="agreeToTerms" className="text-sm">
                    I agree to the <Link to="/terms" className="text-blue-600 hover:underline">Terms of Service</Link> and{' '}
                    <Link to="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>
                  </Label>
                </div>
              </form>
            )}

            {/* Step 3: KYC and Professional Information */}
            {step === 3 && (
              <form className="space-y-6">
                {/* KYC Section */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Shield className="h-5 w-5 mr-2 text-blue-600" />
                    Identity Verification
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="idType">ID Type</Label>
                      <Select value={formData.idType} onValueChange={(value) => handleInputChange('idType', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select ID type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="national-id">National ID</SelectItem>
                          <SelectItem value="passport">Passport</SelectItem>
                          <SelectItem value="drivers-license">Driver's License</SelectItem>
                          <SelectItem value="voters-card">Voter's Card</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="idNumber">ID Number</Label>
                      <Input
                        id="idNumber"
                        value={formData.idNumber}
                        onChange={(e) => handleInputChange('idNumber', e.target.value)}
                        placeholder="Enter your ID number"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      placeholder="Enter your full address"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        placeholder="Enter your city"
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        value={formData.state}
                        onChange={(e) => handleInputChange('state', e.target.value)}
                        placeholder="Enter your state"
                      />
                    </div>
                  </div>
                </div>

                {/* Professional Information (for agents and professionals) */}
                {(userType === 'agent' || userType === 'professional') && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <Users className="h-5 w-5 mr-2 text-purple-600" />
                      Professional Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="licenseNumber">License Number</Label>
                        <Input
                          id="licenseNumber"
                          value={formData.licenseNumber}
                          onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
                          placeholder="Enter your license number"
                        />
                      </div>
                      <div>
                        <Label htmlFor="companyName">Company Name</Label>
                        <Input
                          id="companyName"
                          value={formData.companyName}
                          onChange={(e) => handleInputChange('companyName', e.target.value)}
                          placeholder="Enter your company name"
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <Label htmlFor="experience">Years of Experience</Label>
                      <Select value={formData.experience} onValueChange={(value) => handleInputChange('experience', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select years of experience" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0-1">0-1 years</SelectItem>
                          <SelectItem value="2-5">2-5 years</SelectItem>
                          <SelectItem value="6-10">6-10 years</SelectItem>
                          <SelectItem value="10+">10+ years</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    {userType === 'professional' && (
                      <div className="mt-4">
                        <Label htmlFor="specialization">Specialization</Label>
                        <Select value={formData.specialization} onValueChange={(value) => handleInputChange('specialization', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your specialization" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="lawyer">Lawyer</SelectItem>
                            <SelectItem value="surveyor">Surveyor</SelectItem>
                            <SelectItem value="engineer">Engineer</SelectItem>
                            <SelectItem value="architect">Architect</SelectItem>
                            <SelectItem value="interior-designer">Interior Designer</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>
                )}

                {/* Document Upload */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Upload className="h-5 w-5 mr-2 text-green-600" />
                    Document Upload
                  </h3>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-2">
                      Upload your ID document for verification
                    </p>
                    <Button variant="outline" size="sm">
                      Choose File
                    </Button>
                  </div>
                </div>
              </form>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              {step > 1 && (
                <Button
                  variant="outline"
                  onClick={() => setStep(step - 1)}
                >
                  Previous
                </Button>
              )}
              <div className="flex-1" />
              {step < 3 ? (
                <Button
                  onClick={handleNext}
                  disabled={
                    (step === 1 && !userType) ||
                    (step === 2 && (!formData.firstName || !formData.email || !formData.password || !formData.agreeToTerms))
                  }
                >
                  Next
                </Button>
              ) : (
                <Button onClick={handleSubmit} className="w-full">
                  Create Account
                </Button>
              )}
            </div>

            {/* Login Link */}
            <div className="text-center mt-6">
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-blue-600 hover:underline font-medium">
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Signup; 