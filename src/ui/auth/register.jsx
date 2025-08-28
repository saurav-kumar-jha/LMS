import React from 'react'

function Register() {
    return (
        <div class="min-h-screen flex items-center justify-center bg-[#1a1f1a]">
            <div class="bg-[#1d4112] p-8 rounded-2xl shadow-lg w-96">
                <h2 class="text-2xl font-bold text-white mb-6 text-center">Register</h2>
                <form>
                    <input type="text" placeholder="Full Name" class="w-full p-3 rounded-lg mb-4 bg-green-700 text-white focus:outline-none" />

                    <input type="email" placeholder="Email" class="w-full p-3 rounded-lg mb-4 bg-green-700 text-white focus:outline-none" />

                    <input type="text" placeholder="Mobile Number" class="w-full p-3 rounded-lg mb-4 bg-green-700 text-white focus:outline-none" />

                    <input type="password" placeholder="Password" class="w-full p-3 rounded-lg mb-4 bg-green-700 text-white focus:outline-none" />


                    <input type="password" placeholder="Confirm Password" class="w-full p-3 rounded-lg mb-4 bg-green-700 text-white focus:outline-none" />

                    <button type="submit" class="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-semibold">Register</button>
                </form>

                <p class="text-sm text-gray-300 mt-4 text-center">
                    Already have an account?
                    <a href="login.html" class="text-green-400 hover:underline">Login</a>
                </p>
            </div>
        </div>

    )
}

export default Register