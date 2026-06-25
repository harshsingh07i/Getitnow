import React from 'react';

export default function BenefitsSection() {
  return (
    <section className="relative w-full px-4 sm:px-6 md:px-10 pb-12 sm:pb-20 pt-8 sm:pt-12 flex justify-center">
      <div className="w-full max-w-[1400px]">
        {/* Section Heading */}
        <h2 
          className="text-slate-800 text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 sm:mb-24"
          style={{ letterSpacing: '-0.04em' }}
        >
          Key Benefits
        </h2>

        {/* Three-Column Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          
          {/* Card 1: Text Card (Left) */}
          <div className="relative h-[380px] sm:h-[460px] rounded-[2rem] bg-white/80 backdrop-blur-md border border-white shadow-xl overflow-hidden p-6 sm:p-8 flex flex-col">
            {/* Orange Blob */}
            <div className="absolute top-1/2 -translate-y-1/2 -left-[420px] h-[460px] w-[460px] rounded-full bg-primary blur-[80px] opacity-40 pointer-events-none" />
            
            <div className="relative z-10 flex flex-col h-full">
              <h3 className="text-slate-800 text-2xl sm:text-3xl font-bold leading-tight">
                Lightning Fast<br />
                Local Delivery
              </h3>
              
              <p className="mt-12 sm:mt-20 text-[15px] sm:text-[16px] leading-relaxed text-slate-600 font-medium max-w-[280px]">
                Our advanced routing algorithms connect customers with the nearest vendors, ensuring your groceries and essentials arrive in under 12 minutes.
              </p>
            </div>
          </div>

          {/* Card 2: Video Card (Center) */}
          <div className="relative h-[380px] sm:h-[460px] rounded-[2rem] bg-white/80 backdrop-blur-md border border-white shadow-xl overflow-hidden flex flex-col">
            {/* Top video region */}
            <div className="relative w-full overflow-hidden" style={{ height: '75%' }}>
              <video 
                src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260421_072701_f6a01abb-eb30-4559-9d6e-774362defbc3.mp4"
                autoPlay 
                loop 
                muted 
                playsInline
                className="w-full h-full object-cover block"
              />
              {/* Bottom fade overlay inside video wrapper */}
              <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-white" />
            </div>

            {/* Bottom text region */}
            <div className="flex-1 flex items-center justify-start p-6 sm:p-8 bg-white">
              <h3 className="text-slate-800 text-2xl sm:text-3xl font-bold leading-tight text-left">
                Empowering Local<br />
                Businesses
              </h3>
            </div>
          </div>

          {/* Card 3: Text Card (Right) */}
          <div className="relative h-[380px] sm:h-[460px] rounded-[2rem] bg-white/80 backdrop-blur-md border border-white shadow-xl overflow-hidden p-6 sm:p-8 flex flex-col">
            {/* Yellow Blob */}
            <div className="absolute -top-28 -right-28 h-56 w-56 rounded-full bg-tertiary blur-[80px] opacity-40 pointer-events-none" />
            
            <div className="relative z-10 flex flex-col h-full">
              <h3 className="text-slate-800 text-2xl sm:text-3xl font-bold leading-tight">
                Real-time<br />
                Order Tracking
              </h3>
              
              <p className="mt-auto text-[15px] sm:text-[16px] leading-relaxed text-slate-600 font-medium max-w-[320px]">
                Watch your delivery in real-time. Customers, vendors, and drivers stay perfectly synced on our unified hyperlocal platform to eliminate guesswork.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
