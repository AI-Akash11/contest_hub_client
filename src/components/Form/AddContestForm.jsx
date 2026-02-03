
const AddContestForm = () => {
  return (
    <div className="bg-base-200 rounded-2xl shadow-xl p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">
          Create <span className="gradient-text">New Contest</span>
        </h2>
        <p className="text-base-content/70">
          Provide contest details below. Creator info will be added
          automatically.
        </p>
      </div>

      {/* Form */}
      <form className="space-y-6">
        {/* Contest Name */}
        <div>
          <label className="block text-sm font-semibold mb-1">
            Contest Name
          </label>
          <input
            type="text"
            placeholder="Enter contest name"
            className="w-full bg-base-200 rounded-lg px-4 py-3 border border-base-content/20 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-semibold mb-1">
            Contest Image
          </label>

          <div className="relative flex items-center justify-center w-full h-40 border-2 border-dashed border-base-content/30 rounded-xl bg-base-200 hover:border-primary transition">
            <input
              type="file"
              accept="image/*"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="text-center pointer-events-none">
              <p className="font-medium text-base-content/70">
                Click to upload contest image
              </p>
              <p className="text-xs text-base-content/50 mt-1">
                PNG, JPG, JPEG recommended
              </p>
            </div>
          </div>
        </div>

        {/* Contest Type */}
        <div>
          <label className="block text-sm font-semibold mb-1">
            Contest Type
          </label>
          <select
            className="w-full bg-base-300 border border-base-content/20 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
            defaultValue=""
          >
            <option value="" disabled>
              Select contest type
            </option>

            <optgroup label="Creative">
              <option value="Design">Design</option>
              <option value="Graphic Design">Graphic Design</option>
              <option value="UI/UX Design">UI / UX Design</option>
              <option value="Illustration">Illustration</option>
              <option value="Photography">Photography</option>
              <option value="Videography">Videography</option>
              <option value="Animation">Animation</option>
            </optgroup>

            <optgroup label="Writing & Content">
              <option value="Writing">Writing</option>
              <option value="Creative Writing">Creative Writing</option>
              <option value="Copywriting">Copywriting</option>
              <option value="Blogging">Blogging</option>
              <option value="Technical Writing">Technical Writing</option>
              <option value="Poetry">Poetry</option>
            </optgroup>

            <optgroup label="Tech & Development">
              <option value="Coding">Coding</option>
              <option value="Web Development">Web Development</option>
              <option value="App Development">App Development</option>
              <option value="Game Development">Game Development</option>
              <option value="AI / Machine Learning">
                AI / Machine Learning
              </option>
              <option value="Data Science">Data Science</option>
            </optgroup>

            <optgroup label="Business & Marketing">
              <option value="Marketing">Marketing</option>
              <option value="Digital Marketing">Digital Marketing</option>
              <option value="SEO">SEO</option>
              <option value="Branding">Branding</option>
              <option value="Startup Pitch">Startup Pitch</option>
            </optgroup>

            <optgroup label="Media & Performance">
              <option value="Music">Music</option>
              <option value="Voice Acting">Voice Acting</option>
              <option value="Podcast">Podcast</option>
              <option value="Short Film">Short Film</option>
            </optgroup>

            <optgroup label="Academic & Innovation">
              <option value="Research">Research</option>
              <option value="Case Study">Case Study</option>
              <option value="Hackathon">Hackathon</option>
              <option value="Ideathon">Ideathon</option>
            </optgroup>
            <option value="Others">Others</option>
          </select>
        </div>

        {/* Prize & Entry Fee */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold mb-1">
              Prize Money ($)
            </label>
            <input
              type="number"
              placeholder="1000"
              className="w-full bg-base-200 rounded-lg px-4 py-3 border border-base-content/20 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">
              Entry Fee ($)
            </label>
            <input
              type="number"
              placeholder="20"
              className="w-full bg-base-200 rounded-lg px-4 py-3 border border-base-content/20 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Deadline */}
        <div>
          <label className="block text-sm font-semibold mb-1">
            Submission Deadline
          </label>
          <input
            type="date"
            className="w-full bg-base-200 rounded-lg px-4 py-3 border border-base-content/20 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold mb-1">
            Contest Description
          </label>
          <textarea
            rows="4"
            placeholder="Brief overview of the contest..."
            className="w-full bg-base-200 rounded-lg px-4 py-3 border border-base-content/20 resize-none focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Task Instruction */}
        <div>
          <label className="block text-sm font-semibold mb-1">
            Task Instruction
          </label>
          <textarea
            rows="4"
            placeholder="Explain what participants need to do..."
            className="w-full bg-base-200 rounded-lg px-4 py-3 border border-base-content/20 resize-none focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end pt-6">
          <button
            type="submit"
            className="px-6 py-3 rounded-lg bg-primary text-base-100 font-semibold hover:bg-primary/90 hover:scale-105 hover:shadow-xl hover:shadow-primary/20 transition duration-300 cursor-pointer"
          >
            Create Contest
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddContestForm;
