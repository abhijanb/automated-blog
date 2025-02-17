import { useState } from "react";
import { useForm } from "react-hook-form";
import { GoogleGenerativeAI } from "@google/generative-ai";

const App = () => {
  const HF_API_TOKEN = import.meta.env.VITE_gemini;
  const genAI = new GoogleGenerativeAI(HF_API_TOKEN);
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const { register, handleSubmit, formState: { errors } } = useForm();
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  async function query(inputs) {
    try {
      setLoading(true);

      const prompt = JSON.stringify(inputs.inputData);
      const result = await model.generateContent(prompt);
      console.log(result.response.text);
      setResult(result.response.text());
      setLoading(false);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      setResult(`Error: ${error.message}`);
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <form onSubmit={handleSubmit(query)} className="space-y-4">
          <div>
            <input
              type="text"
              {...register("inputData", { required: "This is required" })}
              placeholder="Enter input data"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.inputData && (
              <p className="text-red-500 text-sm">{errors.inputData.message}</p>
            )}
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 text-white font-semibold rounded-md focus:outline-none 
              ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`}
          >
            {loading ? "Loading..." : "Submit"}
          </button>

          <div>
            {loading ? (
              <p className="text-gray-600 text-center">Loading...</p>
            ) : (
              <p className="text-gray-800 text-center">{result}</p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default App;





