import React from "react";

const JobFilterBar = ({
  searchTerm,
  setSearchTerm,
  selectedWorkMode,
  setSelectedWorkMode,
  selectedCategory,
  setSelectedCategory,
  selectedExperience,
  setSelectedExperience,
  onClearFilters,
}) => {
  return (
    <div className="mb-6 px-24 flex flex-col gap-4 lg:flex-row lg:items-center justify-between">
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by job title or company..."
        className="input input-bordered w-full lg:w-1/3"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        {/* Work Mode Filter */}
        <select
          className="select select-bordered"
          value={selectedWorkMode}
          onChange={(e) => setSelectedWorkMode(e.target.value)}
        >
          <option value="">All Work Modes</option>
          <option value="Onsite">Onsite</option>
          <option value="Remote">Remote</option>
        </select>

        {/* Category Filter */}
        <select
          className="select select-bordered"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Job">Job</option>
          <option value="Internship">Internship</option>
        </select>

        {/* Experience Filter */}
        <select
          className="select select-bordered"
          value={selectedExperience}
          onChange={(e) => setSelectedExperience(e.target.value)}
        >
          <option value="">All Experience Levels</option>
          <option value="Fresher">Fresher</option>
          <option value="1-3 years">1-3 years</option>
          <option value="2+ years">2+ years</option>
          <option value="3+ years">3+ years</option>
        </select>

        {/* Clear Filters */}
        <button className="btn btn-sm btn-outline" onClick={onClearFilters}>
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default JobFilterBar;
