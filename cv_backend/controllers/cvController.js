import { CVModel } from "../modals/cvModel.js";
import { generateResumePDF } from "../utils/generateResumePDF.js";
import { resumeHTML } from "../utils/resumeTemplate.js";

// Get ALL CVS
export const getMyCVs = async (req, res) => {
  try {
    const cvs = await CVModel.find({ user: req.user._id })
      .sort({ createdAt: -1 });

    res.json({ success: true, cvs });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

//Create the black CV
export const createCV = async (req, res) => {
  try {
    const cv = await CVModel.create({
      user: req.user._id,
      title: req.body.title || "Untitled Resume",
      template: req.body.template || "default",
      source: "builder",
      content: {
        basic: {
          profileImage: "",
          name: "",
          email: "",
          phone: "",
          address: "",
          city: "",
          state: "",
          pincode: "",
          summary: "",
          socials: {
            linkedin: "",
            github: "",
            portfolio: "",
            twitter: "",
          },
        },
        education: [],
        experience: [],
        projects: [],
        skills: [],
        certificates: [],
      },
      status: "draft",
    });

    res.status(201).json({ success: true, cv });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

//get the single CV Load by ID
export const getCVById = async (req, res) => {
  try {
    const cv = await CVModel.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!cv) {
      return res.status(404).json({ message: "CV not found" });
    }

    res.json({ success: true, cv });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


//Update the CV part and autosave 
export const updateCV = async (req, res) => {
  try {
    console.log("🔄 UPDATE CV REQUEST BODY SIZE:", 
      JSON.stringify(req.body).length, "characters",
      "≈", Math.round(JSON.stringify(req.body).length / 1024), "KB"
    );
    
    const cv = await CVModel.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      {
        $set: {
          content: req.body.content,
          title: req.body.title,
          template: req.body.template,
          status: req.body.status || "draft",
        },
      },
      { new: true }
    );

    if (!cv) {
      return res.status(404).json({ message: "CV not found" });
    }

    res.json({ success: true, cv });
  } catch (err) {
    console.error("❌ UPDATE CV ERROR:", err.message);
    
    // Check if it's a MongoDB size error
    if (err.message.includes("document is larger than the maximum size")) {
      return res.status(413).json({ 
        success: false, 
        message: "Image too large. Please use a smaller image or compress it." 
      });
    }
    
    res.status(500).json({ success: false, message: err.message });
  }
};

//Preview the CV
export const previewCV = async (req, res) => {
  try {
    const cv = await CVModel.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!cv) {
      return res.status(404).json({ message: "CV not found" });
    }

    res.json({ success: true, cv });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

//DOwnload the CV
export const downloadCV = async (req, res) => {
  try {
    const cv = await CVModel.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!cv) return res.status(404).json({ message: "CV not found" });

    if (!cv.isPaid) {
      return res.status(402).json({ message: "Payment required" });
    }

    const html = resumeHTML(cv);
    const pdfBuffer = await generateResumePDF(html);

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${cv.title}.pdf"`,
      "Content-Length": pdfBuffer.length,
    });

    res.send(pdfBuffer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "PDF generation failed" });
  }
};

//Share the CV 
export const shareCV = async (req, res) => {
  try {
    const cv = await CVModel.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!cv) return res.status(404).json({ message: "CV not found" });
    if (!cv.isPaid) {
      return res.status(402).json({ message: "Payment required" });
    }

    res.json({
      success: true,
      shareUrl: `https://yourapp.com/share/${cv._id}`,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

//Delete CV

export const deleteCV = async (req, res) => {
  try {
    const cv = await CVModel.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!cv) {
      return res.status(404).json({ message: "CV not found" });
    }

    res.json({ success: true, message: "CV deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};