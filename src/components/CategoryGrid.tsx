"use client";

import React from 'react';
import Link from 'next/link';
import { categories } from '@/lib/staticData';

export default function CategoryGrid() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-extrabold text-secondary tracking-tight">Shop by Category</h2>
        <Link href="/categories" className="text-primary font-bold hover:underline">See All</Link>
      </div>
      
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-4 sm:gap-6">
        {categories.map((cat) => (
          <Link 
            href={`/products?categoryId=${cat.id}`} 
            key={cat.id} 
            className="group flex flex-col items-center gap-3 p-3 rounded-2xl hover:bg-white hover:shadow-lg transition-all duration-300"
          >
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-slate-50 flex items-center justify-center overflow-hidden shadow-sm group-hover:shadow-md transition-shadow duration-300">
              {/* Soft glow effect behind the image on hover */}
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-300 z-0"></div>
              
              <img 
                src={cat.image} 
                alt={cat.name} 
                className="w-16 h-16 sm:w-20 sm:h-20 object-contain z-10 transform group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-500 ease-out" 
              />
            </div>
            <span className="text-xs sm:text-sm font-semibold text-slate-700 text-center leading-tight group-hover:text-primary transition-colors">
              {cat.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
