import { LayoutModel } from "../modals/layoutModel.js";

export const seedLayouts = async () => {
  try {
    const count = await LayoutModel.countDocuments();
    if (count > 0) return; // already seeded

    const layouts = [
      {
        name: "Modern Blue",
        thumbnail:
          "https://images.unsplash.com/photo-1526779259212-939e64788e3c?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZnJlZSUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D",
        templateKey: "modernBlue",
      },
      {
        name: "Minimal Professional",
        thumbnail:
          "https://images.unsplash.com/photo-1520975912502-7b7d0f3d6b76?w=800",
        templateKey: "minimal-professional",
      },
      {
        name: "Modern Creative",
        thumbnail:
          "https://images.unsplash.com/photo-1528459105426-bc6ad66470d2?w=800",
        templateKey: "modern-creative",
      },
      {
        name: "Executive",
        thumbnail:
          "https://images.unsplash.com/photo-1525182008055-f88b95ff7980?w=800",
        templateKey: "executive",
      },
    ];

    await LayoutModel.insertMany(layouts);
    console.log("Seeded default layouts");
  } catch (err) {
    console.error("Failed to seed layouts:", err.message);
  }
};
