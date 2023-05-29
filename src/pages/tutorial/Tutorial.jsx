import React, { useState, useEffect } from 'react';

import './Tutorial.css'

function Tutorial() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode) {
      setDarkMode(JSON.parse(savedDarkMode));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    switchColors();
  }, [darkMode]);

  const switchColors = () => {
    const root = document.documentElement;
    if (darkMode) {
      root.style.setProperty('--first-color', '#101010');
      root.style.setProperty('--second-color', '#dddddd');
    } else {
      root.style.setProperty('--first-color', '#dddddd');
      root.style.setProperty('--second-color', '#101010');
    }
  };
  return (
    <div className="tutorial-container">
    
      <div className="tutorial-main">

        <div className="tutorial-main-left">
          <h1 className="tutorial-h1">HOW TO USE</h1>
        </div>

        <div className="tutorial-main-right"> <br/>
          <h2 className="tutorial-h2">TO-DO</h2> <br/>

          <p className="tutorial-p">1. เพิ่มสิ่งที่ต้องทำลงใน Topic</p> <br/>
          <p className="tutorial-p">2. เลือกสีตามระดับความเร่งด่วน หรือใช้แยกหมวดหมู่งาน</p> <br/>
          <p className="tutorial-p">3. ใส่วันและเวลาที่ต้องส่งงานนี้ จากนั้นกดปุ่มเพิ่ม</p> <br/>
          <p className="tutorial-p">4. สามารถแก้ไขหรือลบชื่องานที่ผิดได้</p> <br/>
          <p className="tutorial-p">5. กดปุ่ม Done หลังจากทำงานชิ้นนั้นเสร็จแล้ว</p> <br/>
          <p className="tutorial-p">6. หลังจากกดปุ่ม Done งานจะถูกย้ายไปอีกคอลัมน์ เพื่อความเป็นระเบียบ หากกดผิด สามารถลากกลับมาที่คอลัมน์เดิมได้</p> <br/>
          <p className="tutorial-p">7. สามารถค้นหางานได้ ที่มุมขวาบน โดระบบจะหาทั้ง 2 คอลัมน์</p> <br/> 
          <p className="tutorial-p">8. สามารถลากและวางเพื่อจัดลำดับความสำคัญของงานได้</p> <br/> <br/>

          <h2 className="tutorial-h2">Class timer</h2> <br/>

          <p className="tutorial-p">1. เพิ่มรายวิชาลงใน Course</p> <br/>
          <p className="tutorial-p">2. ใส่เลขห้องที่เรียนวิชานั้น ๆ ลงใน Classroom</p> <br/>
          <p className="tutorial-p">3. ในส่วนของ Classtime สีหมายถึงวันที่เรียน และเวลาอยู่ด้านหลัง ให้ใส่เวลาที่เรียนวิชานี้</p> <br/>
          <p className="tutorial-p">4. สามารถเลื่อนเพื่อดูวันอื่น ๆ ได้</p> <br/>
          <p className="tutorial-p">5. สามารถแก้ไขและลบ รายวิชานั้น ๆ ได้</p> <br/>
          <p className="tutorial-p">6. สามารถค้นหารายวิชาที่เรียนได้ ในคอลัมน์ของวันนั้น ๆ ที่มุมขวาบน</p> <br/>
          <p className="tutorial-p">7. ไม่สามารถลากและวางรายวิชาได้</p> <br/> <br/>

          <h2 className="tutorial-h2">Memo</h2> <br/>

          <p className="tutorial-p">1. เพิ่มโน้ต โดยการกด Add note</p> <br/>
          <p className="tutorial-p">2. หลังจากกด Add note จะมีส่วนของการบันทึกปรากฎขึ้นมา</p> <br/>
          <p className="tutorial-p">3. สามารถแก้ชื่อโน้ตได้</p> <br/>
          <p className="tutorial-p">4. สามารถพิมพ์เนื้อหาที่ต้องการจดได้เลย มีการบันทึกโดยอัตโนมัติ</p> <br/>
          <p className="tutorial-p">5. เมื่อต้องการแก้ไข ให้กดที่ชื่อโน้ตนั้น ๆ</p> <br/>
          <p className="tutorial-p">6. เมื่อต้องการลบโน้ตนั้นทิ้ง ให้กดเข้าไปที่โน้ตนั้น และกดปุ่มลบด้านล่าง</p> <br/>
          <p className="tutorial-p">7. สามารถค้นหาโน้ตที่เขียนไว้นานแล้วได้ที่มุมขวาบน</p> <br/>
          <p className="tutorial-p">8. ไม่สามารถลากและวางโน้ตได้</p> <br/> <br/>

          <h2 className="tutorial-h2">FAQ - ปัญหาที่พบบ่อย</h2> <br/>

          <p className="tutorial-p">ถาม - หน้า Classtimer เลื่อนไม่ได้ทำยังไง?</p> <br/>
          <p className="tutorial-p">ตอบ - กดตรงชื่อวันแล้วเลื่อน อย่าเลื่อนตรงรายวิชา </p> <br/>
          <p className="tutorial-p">ถาม - ทำไม Refresh หน้า Todo, Classtimer, Memo แล้ว 404 Not found?</p> <br/>
          <p className="tutorial-p">ตอบ - กลับไปหน้า Home แล้วรีเฟรช หน้าอื่นนอกจาก Home ไม่สามารถ Refresh ได้</p> <br/>
          <p className="tutorial-p">ถาม - เข้าหน้า To-Do ไม่ได้ </p> <br/>
          <p className="tutorial-p">ตอบ - ล้างแคชของเว็บนี้ก่อน แล้ว Refresh</p> <br/>
          <p className="tutorial-p">ปัญหาเหล่านี้ ทางผู้พัฒนาได้พยายามเลือดตาแทบกระเด็นในการแก้แล้ว แต่ไม่หาย</p>
          <p className="tutorial-p">หากพบปัญหานอกเหนือจากนี้ กรุณาแจ้งเข้ามา<a href='https://github.com/ballpanuwat25/moxi/issues'>ที่นี่</a></p> <br/> 
        </div>

      </div>
    </div>
  )
}

export default Tutorial
