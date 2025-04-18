import React, { useState, useEffect } from "react";
import { Star, Trash2 } from "lucide-react"; // Optional: for better icons
import FloatingInput from "./FloatingInput";

const SkillsForm = () => {
  const [skillInput, setSkillInput] = useState("");
  const [rating, setRating] = useState(1);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const savedSkills = JSON.parse(localStorage.getItem("skills"));
    if (savedSkills) setSkills(savedSkills);
  }, []);

  const handleAddSkill = () => {
    const trimmed = skillInput.trim();
    if (trimmed && !skills.some((s) => s.name === trimmed)) {
      const newSkill = { name: trimmed, rating };
      const updated = [...skills, newSkill];
      setSkills(updated);
      localStorage.setItem("skills", JSON.stringify(updated));
    }
    setSkillInput("");
    setRating(1);
  };

  const handleRemoveSkill = (skillToRemove) => {
    const updated = skills.filter((s) => s.name !== skillToRemove);
    setSkills(updated);
    localStorage.setItem("skills", JSON.stringify(updated));
  };

  const handleRatingChange = (skillName, newRating) => {
    const updated = skills.map((s) =>
      s.name === skillName ? { ...s, rating: newRating } : s
    );
    setSkills(updated);
    localStorage.setItem("skills", JSON.stringify(updated));
  };

  return (
    <div className="relative max-w-3xl mx-auto mt-10">
      <div className="absolute -top-4 left-6 bg-base-100 px-2 text-lg font-semibold text-gray-600">
        Skills
      </div>
      <div className="p-6 border-2 rounded-2xl">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-6">
          <div className="flex items-center gap-8 w-full">
            <FloatingInput
              label="Add skill"
              type="text"
              name="skill"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
            />

            <div
              className="tooltip tooltip-top"
              data-tip="Rate your skill level"
            >
              <div className="rating gap-1">
                {[1, 2, 3, 4, 5].map((val) => (
                  <input
                    key={val}
                    type="radio"
                    name="rating"
                    className="mask mask-star bg-neutral dark:bg-neutral-content"
                    checked={rating === val}
                    onChange={() => setRating(val)}
                  />
                ))}
              </div>
            </div>
          </div>

          <button className="btn btn-neutral w-40" onClick={handleAddSkill}>
            Add Skill
          </button>
        </div>

        {skills.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 font-semibold">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row items-center justify-between p-4 bg-base-200 rounded-xl gap-4"
              >
                <div className="flex-1 flex items-center gap-3">
                  <span className="badge badge-lg badge-primary p-4">
                    {skill.name}
                  </span>
                </div>

                <div className="tooltip" data-tip="Adjust rating">
                  <div className="rating gap-1">
                    {[1, 2, 3, 4, 5].map((val) => (
                      <input
                        key={val}
                        type="radio"
                        name={`rating-${index}`}
                        className="mask mask-star bg-neutral dark:bg-neutral-content"
                        checked={skill.rating === val}
                        onChange={() => handleRatingChange(skill.name, val)}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    className="btn btn-error btn-sm btn-square hover:scale-110 transition-transform duration-150"
                    onClick={() => handleRemoveSkill(skill.name)}
                    title="Remove"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-base-content/50 mt-6">
            No skills added yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default SkillsForm;
