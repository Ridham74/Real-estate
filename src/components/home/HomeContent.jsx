"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import PropertyCategories from "@/components/home/PropertyCategories";
import FeaturedProperties from "@/components/home/FeaturedProperties";
import PopularCities from "@/components/home/PopularCities";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import CallToAction from "@/components/home/CallToAction";
import Footer from "@/components/layout/Footer";

const initialFilters = {
  city: "All Cities",
  purpose: "All Purposes",
  propertyType: "All Types",
  minBudget: "",
  maxBudget: "",
  keyword: "",
};

export default function HomeContent() {
  const [filters, setFilters] = useState(initialFilters);

  const scrollToProperties = () => {
    const el = document.getElementById("properties");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSelectCategory = (category) => {
    setFilters((prev) => {
      const next = { ...prev };
      if (category.id === "buy") {
        next.purpose = "Buy";
        next.propertyType = "All Types";
        next.keyword = "";
      } else if (category.id === "rent") {
        next.purpose = "Rent";
        next.propertyType = "All Types";
        next.keyword = "";
      } else if (category.id === "new-projects") {
        next.purpose = "Buy";
        next.propertyType = "All Types";
        next.keyword = "Under Construction";
      } else if (category.id === "commercial") {
        next.propertyType = "Commercial";
        next.purpose = "All Purposes";
      } else if (category.id === "plots") {
        next.propertyType = "Plot/Land";
        next.purpose = "Buy";
      } else if (category.id === "coliving") {
        next.propertyType = "PG/Co-living";
        next.purpose = "Rent";
      }
      return next;
    });
    scrollToProperties();
  };

  const handleSelectCity = (cityName) => {
    setFilters((prev) => ({
      ...prev,
      city: cityName,
    }));
    scrollToProperties();
  };

  const handleResetFilters = () => {
    setFilters(initialFilters);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-emerald-100 selection:text-emerald-900">
      <Navbar />

      <main className="flex-1">
        {/* 1. Hero with connected search filters */}
        <Hero
          filters={filters}
          setFilters={setFilters}
          onSearch={scrollToProperties}
        />

        {/* 2. Categories with active filtering shortcut */}
        <PropertyCategories onSelectCategory={handleSelectCategory} />

        {/* 3. Comprehensive Property Listings with multi-attribute filtering */}
        <FeaturedProperties
          filters={filters}
          setFilters={setFilters}
          onResetFilters={handleResetFilters}
        />

        {/* 4. Popular Cities with instant city filter trigger */}
        <PopularCities onSelectCity={handleSelectCity} />

        {/* 5. Benefits / Why Choose HomeConnect */}
        <WhyChooseUs />

        {/* 6. Call to Action */}
        <CallToAction />
      </main>

      <Footer />
    </div>
  );
}
