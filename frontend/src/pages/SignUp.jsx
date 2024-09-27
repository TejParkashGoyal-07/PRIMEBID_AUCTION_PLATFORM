import { register } from "@/store/slices/userSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const IndianBanks = [
  "State Bank of India",
  "HDFC Bank",
  "ICICI Bank",
  "Axis Bank",
  "Kotak Mahindra Bank",
  "Punjab National Bank",
  "Bank of Baroda",
  "Canara Bank",
  "Union Bank of India",
];

const SignUp = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [bankAccountName, setBankAccountName] = useState("");
  const [bankAccountNumber, setBankAccountNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [easypaisaAccountNumber, setEasypaisaAccountNumber] = useState("");
  const [paypalEmail, setPaypalEmail] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [profileImagePreview, setProfileImagePreview] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const { loading, isAuthenticated } = useSelector((state) => state.user);
  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const handleRegister = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("userName", userName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("address", address);
    formData.append("role", role);
    formData.append("profileImage", profileImage);
    
    if (role === "Auctioneer") {
      formData.append("bankAccountName", bankAccountName);
      formData.append("bankAccountNumber", bankAccountNumber);
      formData.append("bankName", bankName);
      paymentMethod === "Easypaisa" && formData.append("easypaisaAccountNumber", easypaisaAccountNumber);
      paymentMethod === "PayPal" && formData.append("paypalEmail", paypalEmail);
    }
    
    dispatch(register(formData));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigateTo("/");
    }
  }, [dispatch, loading, isAuthenticated]);

  const imageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setProfileImagePreview(reader.result);
      setProfileImage(file);
    };
  };

  return (
    <section className="w-full ml-0 m-0 h-fit px-5 pt-20 lg:pl-[320px] flex flex-col min-h-screen py-4 justify-center">
      <div className="bg-white mx-auto w-full h-auto px-2 flex flex-col gap-4 items-center py-4 justify-center rounded-md">
        <h1 className="text-[#d6482b] text-2xl font-bold mb-2 min-[480px]:text-4xl md:text-6xl xl:text-7xl 2xl:text-8xl">Register</h1>
        <form className="flex flex-col gap-5 w-full" onSubmit={handleRegister}>
          <p className="font-semibold text-xl md:text-2xl">Personal Details</p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="flex flex-col sm:flex-1">
              <label className="text-[16px] text-stone-600">Full Name</label>
              <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} className="text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none" />
            </div>
            <div className="flex flex-col sm:flex-1">
              <label className="text-[16px] text-stone-600">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none" />
            </div>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="flex flex-col sm:flex-1">
              <label className="text-[16px] text-stone-600">Phone</label>
              <input type="number" value={phone} onChange={(e) => setPhone(e.target.value)} className="text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none" />
            </div>
            <div className="flex flex-col sm:flex-1">
              <label className="text-[16px] text-stone-600">Address</label>
              <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none" />
            </div>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="flex flex-col sm:flex-1">
              <label className="text-[16px] text-stone-600">Role</label>
              <select value={role} onChange={(e) => setRole(e.target.value)} className="text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none">
                <option value="">Select Role</option>
                <option value="Auctioneer">Auctioneer</option>
                <option value="Bidder">Bidder</option>
              </select>
            </div>
            <div className="flex flex-col sm:flex-1">
              <label className="text-[16px] text-stone-600">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none" />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[16px] text-stone-600">Profile Image</label>
            <div className="flex items-center gap-3">
              <img src={profileImagePreview ? profileImagePreview : "/imageHolder.jpg"} alt="profileImagePreview" className="w-14 h-14 rounded-full" />
              <input type="file" onChange={imageHandler} />
            </div>
          </div>

          {/* Payment Method Details */}
          {role === "Auctioneer" && (
            <div className="flex flex-col gap-4">
              <label className="font-semibold text-xl md:2xl flex flex-col">
                Payment Method Details{" "}
                <span className="text-[12px] text-stone-500">Fill Payment Details Only If you are registering as an Auctioneer</span>
              </label>
              <div className="flex flex-col gap-2">
                <label className="text-[16px] text-stone-500">Bank Details</label>
                <div className="flex flex-col gap-1 sm:flex-row sm:gap-4">
                  <select value={bankName} onChange={(e) => setBankName(e.target.value)} className="text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none sm:flex-1">
                    <option value="">Select Your Bank</option>
                    {IndianBanks.map((bank) => (
                      <option key={bank} value={bank}>{bank}</option>
                    ))}
                  </select>
                  <input type="text" value={bankAccountNumber} placeholder="IBAN / IFSC" onChange={(e) => setBankAccountNumber(e.target.value)} className="text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none sm:flex-1" />
                  <input type="text" value={bankAccountName} placeholder="Bank Account UserName" onChange={(e) => setBankAccountName(e.target.value)} className="text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none sm:flex-1" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[16px] text-stone-500">Payment Method</label>
                <div className="flex flex-col gap-2">
                  <label>
                    <input type="radio" value="PayPal" checked={paymentMethod === "PayPal"} onChange={() => setPaymentMethod("PayPal")} />
                    PayPal
                  </label>
                  <label>
                    <input type="radio" value="Easypaisa" checked={paymentMethod === "Easypaisa"} onChange={() => setPaymentMethod("Easypaisa")} />
                    Easypaisa
                  </label>
                </div>
                {paymentMethod === "PayPal" && (
                  <input type="email" value={paypalEmail} placeholder="Your PayPal Email" onChange={(e) => setPaypalEmail(e.target.value)} className="text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none" />
                )}
                {paymentMethod === "Easypaisa" && (
                  <input type="text" value={easypaisaAccountNumber} placeholder="Easypaisa Account Number" onChange={(e) => setEasypaisaAccountNumber(e.target.value)} className="text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none" />
                )}
              </div>
            </div>
          )}

          <button type="submit" className="bg-[#d6482b] text-white font-semibold text-lg py-2 rounded-md">Sign Up</button>
        </form>
      </div>
    </section>
  );
};

export default SignUp;