import Course from "../models/ad.js"
export const getAllCourse = async ( req, res) =>{
        try {
            // Course.find({})
            const course = await Course.find({}).populate('image').populate('postedBy', 'username email'); // Populate để lấy thông tin ảnh và người đăng
            return res.json(course);
        } catch (error) {
            console.log(error)
        }
}
export const getDetailCourse = async ( req, res) =>{
    try {
        const { idCourse } = req.params
        const course = await Course.findOne({ _id: idCourse}).populate('image');
        // console.log(course.image.filename);
        // console.log(course)
        course.toObject();
        // console.log(course)
        return res.json(course);

    } catch (error) {
        console.log(error)
    }
}
export const getAllCourseById = async ( req, res) =>{
    try {
        // Course.find({})
        const course = await Course.find({
            postedBy: req.user._id
        }).populate('image')
        return res.json(course);
    } catch (error) {
        console.log(error)
    }
}
export const deleteCourse = async ( req, res) =>{
    const idCourse = req.params.idCourse;
    console.log("courseID: ", idCourse);
  
    try {
      // Xóa sản phẩm từ giỏ hàng dựa trên _id của sản phẩm
       await Course.findOneAndDelete({_id: idCourse});
      return res
        .status(200)
        .json({ message: "Product removed from cart successfully" });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json(error);
    }
}
export const editCourse = async (req, res) => {
    const idCourse = req.params.idCourse;
    console.log("courseID: ", idCourse);
    console.log('body',req.body)
    const {userID, name, description, price } = req.body;
    console.log(req.body.name);
    
    try {
      
      const updateCourse = await Course.findByIdAndUpdate(idCourse, { name, description,price: parseInt(price) });
  
      console.log('updateCourse',updateCourse)
      return res
        // .json("updateCourse",updateCourse)
        .status(200)
        .json({ message: "Update successfully" });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json(error);
    }
}