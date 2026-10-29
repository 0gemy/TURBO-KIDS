# TURBO KIDS — Premium Edition | by GEMY

لعبة تعليمية عربية للأطفال تجمع سباقات Three.js، الحروف والكلمات، الكراج، العوالم، العملات، والأنشطة المصغّرة. هذه النسخة تركّز على واجهة سينمائية أكثر وضوحًا وتجربة موبايل محسّنة.

## التشغيل
1. فك ضغط ZIP كاملًا في مجلد.
2. افتح `index.html` في Chrome أو Edge. لا يلزم تشغيل Python أو CMD.
3. يلزم اتصال بالإنترنت في هذه النسخة لتحميل Three.js والخطوط من CDN. فتح الملف مباشرة ممكن، لكن دعم التخزين المحلي يختلف بين المتصفحات عند استخدام `file://`.

## التحسينات في هذه النسخة
- شاشة رئيسية جديدة بطابع سينمائي، زر لعب رئيسي، وإحصاءات العملات والنجوم والتقدم.
- تصميم متجاوب للموبايل مع أزرار لمس أكبر وتباين أوضح.
- فتح المراحل بالتتابع بدل إتاحة كل المراحل منذ البداية.
- صعوبة متدرجة بشكل محافظ حسب تقدم الطفل ودقته السابقة، عبر تعديل سرعة السباق ضمن نطاق محدود.
- إصلاح حالة انتهاء القلوب كي لا تستمر المرحلة بعد فقد القلب الأخير.
- منع احتساب مكافأة العملات مرتين عند إعادة الإجابة على السؤال نفسه.
- الإبقاء على الجراج والعوالم والكريستالات والعوائق والألعاب التعليمية وحفظ LocalStorage.

## ملاحظات مهمة
- لا يوجد Backend أو قاعدة بيانات أو تسجيل دخول.
- أصوات الحروف تستخدم ملفات `assets/audio/` إن توفرت، مع الرجوع إلى نطق المتصفح عند غياب الملف. جودة النطق تعتمد على الأصوات العربية المتاحة على الجهاز.
- لم يتم تضمين مكتبة Three.js داخل الحزمة؛ لذلك هذه النسخة ليست Offline بالكامل.
- تم فحص صياغة JavaScript وملف ZIP آليًا، لكن يلزم اختبار اللعب بصريًا على هاتف فعلي قبل النشر.

## الملفات
- `index.html` الواجهة
- `css/style.css` التصميم
- `js/main.js` منطق اللعب والتقدم والحفظ
- `js/car-loader.js` توافق السيارات
- `js/extras.js` مؤثرات إضافية
- `manifest.json`, `sw.js`, `icon.svg` ملفات الويب الاختيارية

## Premium update notes (28 Oct 2026)
- Added a profile page with player name, selectable emoji avatar, and optional local image upload saved in local storage.
- Added a persistent home-return arrow on internal screens and the site responsibility credit: Gamal Mohamed.
- All letter and word levels are selectable from the level map.
- The requested target prompt is labeled clearly as the target letter or word at the top of the racing HUD.
- Added city-house and beach world theme options to the theme catalogue.
- Theme and profile data remain client-side; no backend was added.

Note: Three.js, loader scripts, and web fonts still load from CDNs, so first launch requires an internet connection. The current world previews describe the environments; full custom 3D scenery models for city and beach are not included in this build.


## Premium update 2 (29 Oct 2026)
- Garage preview now uses the same car builder as the race (`buildCarGroup`), with 3D thumbnails and a redesigned layout.
- Back button redrawn (dark navy circle with white arrow). Avatar chip hidden inside games.
- Large target letter/word card at the top of the race HUD with speaker button.
- 9 themes and 9 roads (200 coins each, one free of each); futuristic gates, green crystals (+1) and rare gold crystal (+20), new obstacles.
