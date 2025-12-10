import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/errorMiddlewares.js";
import { Book } from "../models/bookModel.js";
import { Borrow } from "../models/borrowModel.js";
import { User } from "../models/userModel.js";
import { calculateFine } from "../utils/fineCalculator.js";




export const recordBorrowedBook = catchAsyncErrors(async(req,res,next)=>{
    const {id} = req.params;
    const {email} =  req.body;
    const book = await Book.findById(id)
    if (!book) {
        return next( new ErrorHandler('Book not found.', 404))
    }
    const user = await User.findOne({email , accountVerified:true})
    if (!user) {
    return next( new ErrorHandler('User not found.',404))
    }
    if (book.quantity === 0) {
    return next( new ErrorHandler('Book is stock out.',400))
    }
    const isAlreadyBorrowed = user.borrowedBooks.find(
        (b)=> b.bookId?.toString() === id && b.returned === false
    )
    if (isAlreadyBorrowed){
    return next( new ErrorHandler('Books has already borrowed.',400))
    }
    book.quantity -= 1;
    book.availability = book.quantity > 0;
    await book.save();

    user.borrowedBooks.push({
        bookId: book._id,
        bookTitle: book.title,
        borrowedDate:new Date(),
        dueDate:new Date(Date.now()+ 7 *24 * 60 * 60 *1000)
    })
    await user.save()
    await Borrow.create({
        user:{
            id: user._id,
            name:user.name,
            email:user.email,
        },
        book:book._id,
        dueDate:new Date(Date.now() + 7 *24 * 60 * 60 *1000),
        price:book.price,
    })
    res.status(200).json({
        success:true,
        message:'Borrowed books recorded successfully.'
    })


})

export const returnBorrowedBooks = catchAsyncErrors(async(req,res,next)=>{
    const {bookId} = req.params;
    const {email} = req.body;
    const book = await Book.findById(bookId)
    if (!book) {
        return next( new ErrorHandler('Book not found.', 404))
    }
    const user = await User.findOne({email,accountVerified:true})
    if (!user) {
    return next( new ErrorHandler('User not found.',404))
    }
    const borrowedBooks = user.borrowedBooks.find(
    (b)=> b.bookId?.toString() === bookId && b.returned === false
    )
    if (!borrowedBooks) {
     return next( new ErrorHandler('You have not borrowed this books.', 400))

    }
    borrowedBooks.returned = true;
    await user.save()
    book.quantity += 1;
    book.availability = book.quantity > 0;
    await book.save()

    const borrow = await Borrow.findOne({
        'user.email':email,
        returnData:null,
    })
    if (!borrow) {
             return next( new ErrorHandler('You have not borrowed this book.', 400))    
    }
    book.returnData = new Date()
    const fine = calculateFine(borrow.dueData);
    borrow.fine = fine;
    await borrow.save()
    res.status(200).json({
        success:true,
        message: fine !== 0 ? `he book has been return successfully. The total charges including a fine, are $${fine + book.price}` : `The book has been return successfully. The total charges are $${book.price}`,
    })


})

export const borrowedBooks = catchAsyncErrors(async(req,res,next)=>{
    const {borrowedBooks} = req.user;
    res.status(200).json({
        success:true,
        borrowedBooks
    })
})



export const getBorrowedBooksForAdmin = catchAsyncErrors(async(req,res,next)=>{
    const borrowedBooks = Borrow.find()
    res.status(200).json({
        success:true,
        borrowedBooks
    })

})

