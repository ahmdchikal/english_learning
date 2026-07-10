-- ============================================================
-- EnglishPath seed data
-- Populates demo learning content: levels, units, lessons,
-- vocabulary, examples, quiz/practice questions, a 20-question
-- placement test bank, and gamification achievements.
--
-- Safe to re-run: it deletes existing content rows first (in an
-- order that respects foreign keys) before inserting fresh data.
-- Run this AFTER applying all files in supabase/migrations/.
-- ============================================================

-- ===== CLEANUP (children first, respecting FKs) =====
delete from public.question_options;
delete from public.questions;
delete from public.lesson_examples;
delete from public.vocabulary;
delete from public.lessons;
delete from public.units;
delete from public.levels;
delete from public.achievements;

-- ===== LEVELS =====
insert into public.levels (id, name, slug, cefr_code, title, description, order_index, required_xp, force_unlocked, is_published) values
  ('10000000-0000-4000-8000-000000000001', 'Pre-A1', 'pre-a1', 'Pre-A1', 'Pemula Absolut', 'Level ini dirancang untuk pemula yang belum memiliki dasar Bahasa Inggris sama sekali. Anda akan belajar alfabet, angka, salam dasar, dan cara memperkenalkan diri. Setelah menyelesaikan level ini, Anda akan siap membangun fondasi tata bahasa yang lebih kuat.', 0, 0, false, true),
  ('10000000-0000-4000-8000-000000000002', 'A1', 'a1', 'A1', 'Pemula', 'Level A1 membangun fondasi tata bahasa dasar seperti kata ganti, kata kerja to be, dan simple present tense. Anda juga akan belajar kosakata tentang keluarga dan aktivitas harian. Level ini cocok bagi yang sudah mengenal dasar-dasar namun ingin memperkuat struktur kalimat sederhana.', 1, 300, false, true),
  ('10000000-0000-4000-8000-000000000003', 'A2', 'a2', 'A2', 'Dasar', 'Pada level A2, Anda akan mempelajari simple past tense, rencana masa depan, dan cara mendeskripsikan orang lain. Topik praktis seperti memesan makanan dan menanyakan arah juga dibahas agar Anda semakin percaya diri berkomunikasi. Level ini menjembatani kemampuan dasar menuju percakapan yang lebih kompleks.', 2, 800, false, true),
  ('10000000-0000-4000-8000-000000000004', 'B1', 'b1', 'B1', 'Menengah', 'Level B1 memperkenalkan present perfect tense dan kemampuan menyampaikan opini secara lebih matang. Anda akan berlatih bahasa Inggris di tempat kerja, percakapan saat traveling, dan menulis email sederhana. Level ini membantu Anda menggunakan bahasa Inggris dalam situasi nyata sehari-hari.', 3, 1600, false, true),
  ('10000000-0000-4000-8000-000000000005', 'B2', 'b2', 'B2', 'Menengah Atas', 'Level B2 berfokus pada struktur kalimat yang lebih kompleks seperti conditionals dan kalimat pasif. Anda juga akan berlatih diskusi formal, wawancara kerja, dan keterampilan presentasi. Level ini mempersiapkan Anda untuk komunikasi profesional yang lebih menuntut.', 4, 2800, false, true),
  ('10000000-0000-4000-8000-000000000006', 'C1', 'c1', 'C1', 'Mahir', 'Level C1 adalah tahap mahir yang mencakup kosakata tingkat lanjut dan penulisan akademik. Anda akan mempelajari struktur kalimat kompleks, debat, argumentasi, dan komunikasi profesional tingkat tinggi. Setelah menyelesaikan level ini, Anda akan mampu berkomunikasi dengan lancar dalam berbagai konteks formal maupun informal.', 5, 4200, false, true);

-- ===== UNITS =====
insert into public.units (id, level_id, title, slug, description, order_index, force_unlocked, is_published) values
  ('20000000-0000-4000-8000-000000000001', '10000000-0000-4000-8000-000000000001', 'Alfabet dan Pengucapan', 'alphabet-pronunciation', 'Pelajari 26 huruf alfabet Bahasa Inggris beserta cara pengucapannya yang benar.', 0, false, true),
  ('20000000-0000-4000-8000-000000000002', '10000000-0000-4000-8000-000000000001', 'Angka 1-100', 'numbers-1-100', 'Kuasai angka dalam Bahasa Inggris dari 1 hingga 100 untuk kebutuhan sehari-hari.', 1, false, true),
  ('20000000-0000-4000-8000-000000000003', '10000000-0000-4000-8000-000000000001', 'Salam Dasar', 'basic-greetings', 'Pelajari cara menyapa, menanyakan kabar, dan memperkenalkan diri dalam Bahasa Inggris.', 2, false, true),
  ('20000000-0000-4000-8000-000000000004', '10000000-0000-4000-8000-000000000001', 'Memperkenalkan Diri', 'introducing-yourself', 'Latih cara memperkenalkan diri secara lebih detail, termasuk asal dan pekerjaan.', 3, false, true),
  ('20000000-0000-4000-8000-000000000005', '10000000-0000-4000-8000-000000000001', 'Warna dan Benda Sehari-hari', 'colors-objects', 'Pelajari nama-nama warna dan benda-benda yang sering dijumpai sehari-hari.', 4, false, true),
  ('20000000-0000-4000-8000-000000000006', '10000000-0000-4000-8000-000000000002', 'Kata Ganti Subjek', 'subject-pronouns', 'Pelajari kata ganti subjek seperti I, you, he, she, it, we, they.', 0, false, true),
  ('20000000-0000-4000-8000-000000000007', '10000000-0000-4000-8000-000000000002', 'Kata Kerja To Be', 'verb-to-be', 'Kuasai penggunaan am, is, are dalam kalimat Bahasa Inggris.', 1, false, true),
  ('20000000-0000-4000-8000-000000000008', '10000000-0000-4000-8000-000000000002', 'Simple Present Tense', 'simple-present-tense', 'Pelajari cara membentuk dan menggunakan simple present tense untuk kebiasaan dan fakta.', 2, false, true),
  ('20000000-0000-4000-8000-000000000009', '10000000-0000-4000-8000-000000000002', 'Anggota Keluarga', 'family-members', 'Pelajari kosakata anggota keluarga dalam Bahasa Inggris.', 3, false, true),
  ('20000000-0000-4000-8000-000000000010', '10000000-0000-4000-8000-000000000002', 'Aktivitas Harian', 'daily-activities', 'Pelajari kosakata dan kalimat untuk menceritakan aktivitas sehari-hari.', 4, false, true),
  ('20000000-0000-4000-8000-000000000011', '10000000-0000-4000-8000-000000000003', 'Simple Past Tense', 'simple-past-tense', 'Pelajari cara membentuk simple past tense dengan kata kerja beraturan dan tidak beraturan.', 0, false, true),
  ('20000000-0000-4000-8000-000000000012', '10000000-0000-4000-8000-000000000003', 'Rencana Masa Depan', 'future-plans', 'Pelajari cara membicarakan rencana masa depan menggunakan will dan going to.', 1, false, true),
  ('20000000-0000-4000-8000-000000000013', '10000000-0000-4000-8000-000000000003', 'Mendeskripsikan Orang', 'describing-people', 'Pelajari kosakata dan kalimat untuk mendeskripsikan penampilan dan sifat orang.', 2, false, true),
  ('20000000-0000-4000-8000-000000000014', '10000000-0000-4000-8000-000000000003', 'Makanan dan Memesan', 'food-ordering', 'Pelajari kosakata makanan dan cara memesan di restoran.', 3, false, true),
  ('20000000-0000-4000-8000-000000000015', '10000000-0000-4000-8000-000000000003', 'Menanyakan Arah', 'asking-directions', 'Pelajari cara menanyakan dan memberikan arah dalam Bahasa Inggris.', 4, false, true),
  ('20000000-0000-4000-8000-000000000016', '10000000-0000-4000-8000-000000000004', 'Present Perfect Tense', 'present-perfect-tense', 'Pelajari cara membentuk dan menggunakan present perfect tense.', 0, false, true),
  ('20000000-0000-4000-8000-000000000017', '10000000-0000-4000-8000-000000000004', 'Menyampaikan Opini', 'giving-opinions', 'Pelajari ungkapan untuk menyampaikan pendapat dan sudut pandang.', 1, false, true),
  ('20000000-0000-4000-8000-000000000018', '10000000-0000-4000-8000-000000000004', 'Bahasa Inggris di Tempat Kerja', 'workplace-english', 'Pelajari kosakata dan ungkapan Bahasa Inggris untuk situasi kerja.', 2, false, true),
  ('20000000-0000-4000-8000-000000000019', '10000000-0000-4000-8000-000000000004', 'Percakapan Perjalanan', 'travel-conversations', 'Pelajari ungkapan penting untuk bepergian dan traveling.', 3, false, true),
  ('20000000-0000-4000-8000-000000000020', '10000000-0000-4000-8000-000000000004', 'Menulis Email Sederhana', 'writing-emails', 'Pelajari struktur dan ungkapan untuk menulis email formal dan informal.', 4, false, true),
  ('20000000-0000-4000-8000-000000000021', '10000000-0000-4000-8000-000000000005', 'Kalimat Pengandaian (Conditionals)', 'conditionals', 'Pelajari zero, first, dan second conditional untuk membicarakan kemungkinan.', 0, false, true),
  ('20000000-0000-4000-8000-000000000022', '10000000-0000-4000-8000-000000000005', 'Kalimat Pasif', 'passive-voice', 'Pelajari cara membentuk dan menggunakan kalimat pasif.', 1, false, true),
  ('20000000-0000-4000-8000-000000000023', '10000000-0000-4000-8000-000000000005', 'Diskusi Formal', 'formal-discussions', 'Pelajari ungkapan untuk berdiskusi secara formal dan sopan.', 2, false, true),
  ('20000000-0000-4000-8000-000000000024', '10000000-0000-4000-8000-000000000005', 'Wawancara Kerja', 'job-interviews', 'Pelajari ungkapan dan strategi untuk menghadapi wawancara kerja.', 3, false, true),
  ('20000000-0000-4000-8000-000000000025', '10000000-0000-4000-8000-000000000005', 'Keterampilan Presentasi', 'presentation-skills', 'Pelajari cara menyusun dan menyampaikan presentasi dalam Bahasa Inggris.', 4, false, true),
  ('20000000-0000-4000-8000-000000000026', '10000000-0000-4000-8000-000000000006', 'Kosakata Tingkat Lanjut', 'advanced-vocabulary', 'Perluas kosakata tingkat lanjut untuk komunikasi yang lebih presisi.', 0, false, true),
  ('20000000-0000-4000-8000-000000000027', '10000000-0000-4000-8000-000000000006', 'Penulisan Akademik', 'academic-writing', 'Pelajari gaya dan struktur penulisan akademik dalam Bahasa Inggris.', 1, false, true),
  ('20000000-0000-4000-8000-000000000028', '10000000-0000-4000-8000-000000000006', 'Struktur Kalimat Kompleks', 'complex-sentence-structures', 'Pelajari cara menyusun kalimat kompleks dengan berbagai klausa.', 2, false, true),
  ('20000000-0000-4000-8000-000000000029', '10000000-0000-4000-8000-000000000006', 'Debat dan Argumentasi', 'debate-argumentation', 'Pelajari ungkapan dan strategi untuk berdebat dan menyampaikan argumen.', 3, false, true),
  ('20000000-0000-4000-8000-000000000030', '10000000-0000-4000-8000-000000000006', 'Komunikasi Profesional', 'professional-communication', 'Pelajari komunikasi profesional tingkat lanjut untuk konteks bisnis.', 4, false, true);

-- ===== LESSONS =====

-- ----- Lesson: Greetings and Introductions (Salam Dasar) -----
insert into public.lessons (id, unit_id, title, slug, description, learning_objectives, explanation, grammar_notes, common_mistakes, estimated_minutes, xp_reward, order_index, force_unlocked, is_published) values
  ('30000000-0000-4000-8000-000000000001', '20000000-0000-4000-8000-000000000003', 'Greetings and Introductions', 'greetings-and-introductions', 'Pelajari cara menyapa, menanyakan kabar, dan memperkenalkan diri dengan percaya diri dalam Bahasa Inggris.', array['Menggunakan sapaan yang tepat sesuai waktu dan tingkat formalitas','Menanyakan dan menjawab kabar seseorang','Memperkenalkan nama dan asal diri sendiri','Merespons perkenalan orang lain dengan sopan','Menyusun dialog perkenalan sederhana']::text[], 'Dalam Bahasa Inggris, sapaan yang digunakan sering bergantung pada waktu dalam sehari. Anda bisa menggunakan "Hello" atau "Hi" kapan saja sebagai sapaan umum, sementara "Good morning" digunakan pada pagi hari (biasanya sebelum tengah hari), "Good afternoon" digunakan siang hingga sore hari, dan "Good evening" digunakan pada malam hari saat bertemu seseorang. Perhatikan bahwa "Good night" berbeda dari "Good evening" karena "Good night" digunakan sebagai ucapan perpisahan sebelum tidur, bukan sebagai sapaan saat bertemu.

Dari segi formalitas, "Hello" bersifat lebih netral dan bisa digunakan dalam situasi formal maupun informal, sedangkan "Hi" terasa lebih santai dan akrab, cocok digunakan kepada teman sebaya atau orang yang sudah dikenal. Dalam situasi formal seperti bertemu atasan, klien, atau orang yang baru dikenal di lingkungan profesional, sebaiknya gunakan "Hello" atau sapaan berdasarkan waktu seperti "Good morning".

Setelah menyapa, hal yang wajar dilakukan adalah menanyakan kabar dengan "How are you?". Jawaban paling umum adalah "I am fine", yang berarti "saya baik-baik saja". Anda juga bisa menambahkan "thank you" setelahnya menjadi "I am fine, thank you" untuk terdengar lebih sopan. Setelah menjawab, adalah kebiasaan yang baik untuk balik menanyakan kabar lawan bicara Anda.

Untuk memperkenalkan diri, Anda dapat bertanya "What is your name?" untuk menanyakan nama seseorang, dan menjawab dengan "My name is..." diikuti nama Anda. Setelah berkenalan, ungkapan "Nice to meet you" digunakan untuk mengekspresikan rasa senang bertemu seseorang untuk pertama kalinya.

Selain nama, orang sering menanyakan asal seseorang dengan "Where are you from?". Anda dapat menjawab menggunakan struktur "I am from..." diikuti nama negara atau kota, misalnya "I am from Indonesia" yang berarti "saya dari Indonesia".', 'Perhatikan pola subjek + kata kerja to be (am/is/are) yang muncul dalam kalimat seperti "I am fine" dan "I am from Indonesia" -- subjek "I" selalu berpasangan dengan "am". Untuk membentuk kalimat tanya, kata kerja to be dipindahkan ke depan subjek, seperti pada "What is your name?" (subjek "your name" + is) dan "Where are you from?" (subjek "you" + are). Struktur ini disebut inversi subjek-verba dan merupakan pola dasar dalam pembentukan kalimat tanya di Bahasa Inggris.', 'Beberapa kesalahan umum yang dilakukan pelajar Indonesia: (1) Menjawab "How are you?" dengan tambahan kata yang tidak perlu seperti "I am the fine"; bentuk yang benar cukup "I am fine, thank you. And you?". (2) Mencampur "How are you?" dengan "What are you?" -- padahal "How are you?" menanyakan kabar/keadaan, sedangkan "What are you?" menanyakan identitas atau profesi dan terdengar tidak lazim digunakan sebagai sapaan. (3) Menerjemahkan secara literal dari Bahasa Indonesia, misalnya mengatakan "Where you from?" tanpa kata kerja to be "are", padahal seharusnya "Where are you from?". (4) Melupakan kata kerja to be (am/is/are) sepenuhnya, seperti mengatakan "I fine" atau "I from Indonesia" padahal seharusnya "I am fine" dan "I am from Indonesia" karena Bahasa Inggris mewajibkan kata kerja dalam kalimat, berbeda dengan Bahasa Indonesia yang bisa menghilangkan kata "adalah".', 15, 20, 0, false, true);

insert into public.vocabulary (id, lesson_id, english_word, indonesian_meaning, phonetic, example_sentence, example_translation, word_type, order_index) values
  ('40000000-0000-4000-8000-000000000001', '30000000-0000-4000-8000-000000000001', 'Hello', 'Halo', 'heh-LOH', 'Hello, my name is Sarah.', 'Halo, nama saya Sarah.', 'greeting', 0),
  ('40000000-0000-4000-8000-000000000002', '30000000-0000-4000-8000-000000000001', 'Hi', 'Hai', 'hai', 'Hi! How are you today?', 'Hai! Bagaimana kabarmu hari ini?', 'greeting', 1),
  ('40000000-0000-4000-8000-000000000003', '30000000-0000-4000-8000-000000000001', 'Good morning', 'Selamat pagi', 'gud MOR-ning', 'Good morning, everyone!', 'Selamat pagi, semuanya!', 'greeting', 2),
  ('40000000-0000-4000-8000-000000000004', '30000000-0000-4000-8000-000000000001', 'Good afternoon', 'Selamat siang/sore', 'gud AF-ter-noon', 'Good afternoon, Mr. Johnson.', 'Selamat siang, Bapak Johnson.', 'greeting', 3),
  ('40000000-0000-4000-8000-000000000005', '30000000-0000-4000-8000-000000000001', 'Good evening', 'Selamat malam', 'gud EE-vning', 'Good evening, welcome to the party.', 'Selamat malam, selamat datang di pesta.', 'greeting', 4),
  ('40000000-0000-4000-8000-000000000006', '30000000-0000-4000-8000-000000000001', 'How are you?', 'Bagaimana kabarmu?', 'how ar yoo', 'Hi Tom, how are you?', 'Hai Tom, bagaimana kabarmu?', 'question', 5),
  ('40000000-0000-4000-8000-000000000007', '30000000-0000-4000-8000-000000000001', 'I am fine', 'Saya baik-baik saja', 'ai am fain', 'I am fine, thank you.', 'Saya baik-baik saja, terima kasih.', 'phrase', 6),
  ('40000000-0000-4000-8000-000000000008', '30000000-0000-4000-8000-000000000001', 'What is your name?', 'Apa namamu?', 'wot iz yor naym', 'Excuse me, what is your name?', 'Maaf, apa namamu?', 'question', 7),
  ('40000000-0000-4000-8000-000000000009', '30000000-0000-4000-8000-000000000001', 'My name is', 'Nama saya adalah', 'mai naym iz', 'My name is Andi.', 'Nama saya Andi.', 'phrase', 8),
  ('40000000-0000-4000-8000-000000000010', '30000000-0000-4000-8000-000000000001', 'Nice to meet you', 'Senang bertemu denganmu', 'nais tu meet yoo', 'Nice to meet you, Sarah.', 'Senang bertemu denganmu, Sarah.', 'phrase', 9),
  ('40000000-0000-4000-8000-000000000011', '30000000-0000-4000-8000-000000000001', 'Where are you from?', 'Kamu berasal dari mana?', 'wehr ar yoo from', 'Where are you from, originally?', 'Kamu aslinya berasal dari mana?', 'question', 10),
  ('40000000-0000-4000-8000-000000000012', '30000000-0000-4000-8000-000000000001', 'I am from Indonesia', 'Saya dari Indonesia', 'ai am from in-doh-NEE-zhah', 'I am from Indonesia, from Jakarta.', 'Saya dari Indonesia, dari Jakarta.', 'phrase', 11);

insert into public.lesson_examples (id, lesson_id, english_text, indonesian_text, explanation, order_index) values
  ('50000000-0000-4000-8000-000000000001', '30000000-0000-4000-8000-000000000001', 'Hello! My name is Andi.', 'Halo! Nama saya Andi.', 'Andi menyapa dan langsung memperkenalkan namanya menggunakan pola My name is...', 0),
  ('50000000-0000-4000-8000-000000000002', '30000000-0000-4000-8000-000000000001', 'Hi Andi! Nice to meet you. My name is Sarah.', 'Hai Andi! Senang bertemu denganmu. Nama saya Sarah.', 'Sarah merespons dengan sapaan santai Hi dan ungkapan Nice to meet you.', 1),
  ('50000000-0000-4000-8000-000000000003', '30000000-0000-4000-8000-000000000001', 'Nice to meet you too. Where are you from?', 'Senang bertemu denganmu juga. Kamu berasal dari mana?', 'Andi menanyakan asal Sarah menggunakan Where are you from?', 2),
  ('50000000-0000-4000-8000-000000000004', '30000000-0000-4000-8000-000000000001', 'I am from Canada. And you? Where are you from?', 'Saya dari Kanada. Kamu? Kamu berasal dari mana?', 'Sarah menjawab dengan I am from... lalu bertanya balik.', 3),
  ('50000000-0000-4000-8000-000000000005', '30000000-0000-4000-8000-000000000001', 'I am from Indonesia. How are you today?', 'Saya dari Indonesia. Bagaimana kabarmu hari ini?', 'Andi menjawab lalu menanyakan kabar dengan How are you today?', 4),
  ('50000000-0000-4000-8000-000000000006', '30000000-0000-4000-8000-000000000001', 'I am fine, thank you!', 'Saya baik-baik saja, terima kasih!', 'Sarah menjawab kabar dengan pola I am fine, thank you.', 5);

insert into public.questions (id, lesson_id, type, prompt, instruction, correct_answer, explanation, audio_text, difficulty, order_index, points, is_placement_question) values
  ('60000000-0000-4000-8000-000000000001', '30000000-0000-4000-8000-000000000001', 'multiple_choice', 'Choose the correct greeting for the morning.', 'Pilih sapaan yang tepat untuk digunakan pada pagi hari.', 'Good morning', 'Good morning digunakan untuk menyapa pada pagi hari, sebelum tengah hari.', null, 'beginner', 0, 1, false);
insert into public.question_options (id, question_id, option_text, is_correct, order_index) values
  ('70000000-0000-4000-8000-000000000001', '60000000-0000-4000-8000-000000000001', 'Good morning', true, 0),
  ('70000000-0000-4000-8000-000000000002', '60000000-0000-4000-8000-000000000001', 'Good evening', false, 1),
  ('70000000-0000-4000-8000-000000000003', '60000000-0000-4000-8000-000000000001', 'Good night', false, 2),
  ('70000000-0000-4000-8000-000000000004', '60000000-0000-4000-8000-000000000001', 'Goodbye', false, 3);

insert into public.questions (id, lesson_id, type, prompt, instruction, correct_answer, explanation, audio_text, difficulty, order_index, points, is_placement_question) values
  ('60000000-0000-4000-8000-000000000002', '30000000-0000-4000-8000-000000000001', 'fill_blank', 'My name ___ Andi.', 'Lengkapi kalimat dengan kata kerja to be yang tepat.', 'is', 'Subjek ''My name'' merupakan kata tunggal (singular), sehingga menggunakan ''is''.', null, 'beginner', 1, 1, false);

insert into public.questions (id, lesson_id, type, prompt, instruction, correct_answer, explanation, audio_text, difficulty, order_index, points, is_placement_question) values
  ('60000000-0000-4000-8000-000000000003', '30000000-0000-4000-8000-000000000001', 'sentence_arrangement', 'from / Indonesia / I / am', 'Susun kata-kata berikut menjadi kalimat yang benar untuk menyatakan asal.', 'I am from Indonesia', 'Struktur kalimat yang benar adalah Subjek + to be + from + Negara: I am from Indonesia.', null, 'beginner', 2, 1, false);

insert into public.questions (id, lesson_id, type, prompt, instruction, correct_answer, explanation, audio_text, difficulty, order_index, points, is_placement_question) values
  ('60000000-0000-4000-8000-000000000004', '30000000-0000-4000-8000-000000000001', 'matching', 'Cocokkan sapaan Bahasa Inggris ''hello'' dengan artinya dalam Bahasa Indonesia.', 'Pasangkan setiap sapaan dengan makna yang tepat.', 'hello=halo', 'Hello berarti halo, sapaan umum yang dapat digunakan kapan saja.', null, 'beginner', 3, 1, false);

insert into public.questions (id, lesson_id, type, prompt, instruction, correct_answer, explanation, audio_text, difficulty, order_index, points, is_placement_question) values
  ('60000000-0000-4000-8000-000000000005', '30000000-0000-4000-8000-000000000001', 'true_false', '''Good night'' is used to greet someone when you meet them in the morning.', 'Tentukan apakah pernyataan berikut benar atau salah.', 'False', '''Good night'' digunakan sebagai ucapan perpisahan sebelum tidur, bukan sapaan saat bertemu di pagi hari.', null, 'beginner', 4, 1, false);
insert into public.question_options (id, question_id, option_text, is_correct, order_index) values
  ('70000000-0000-4000-8000-000000000005', '60000000-0000-4000-8000-000000000005', 'True', false, 0),
  ('70000000-0000-4000-8000-000000000006', '60000000-0000-4000-8000-000000000005', 'False', true, 1);

insert into public.questions (id, lesson_id, type, prompt, instruction, correct_answer, explanation, audio_text, difficulty, order_index, points, is_placement_question) values
  ('60000000-0000-4000-8000-000000000006', '30000000-0000-4000-8000-000000000001', 'multiple_choice', 'What do you say when you meet someone for the first time?', 'Pilih ungkapan yang tepat saat bertemu seseorang untuk pertama kalinya.', 'Nice to meet you', 'Nice to meet you digunakan untuk mengekspresikan rasa senang bertemu seseorang untuk pertama kalinya.', null, 'beginner', 5, 1, false);
insert into public.question_options (id, question_id, option_text, is_correct, order_index) values
  ('70000000-0000-4000-8000-000000000007', '60000000-0000-4000-8000-000000000006', 'Nice to meet you', true, 0),
  ('70000000-0000-4000-8000-000000000008', '60000000-0000-4000-8000-000000000006', 'Good night', false, 1),
  ('70000000-0000-4000-8000-000000000009', '60000000-0000-4000-8000-000000000006', 'I am fine', false, 2),
  ('70000000-0000-4000-8000-000000000010', '60000000-0000-4000-8000-000000000006', 'See you later', false, 3);

insert into public.questions (id, lesson_id, type, prompt, instruction, correct_answer, explanation, audio_text, difficulty, order_index, points, is_placement_question) values
  ('60000000-0000-4000-8000-000000000007', '30000000-0000-4000-8000-000000000001', 'multiple_choice', 'Which greeting is most appropriate in the evening?', 'Pilih sapaan yang paling tepat digunakan pada malam hari.', 'Good evening', 'Good evening digunakan untuk menyapa pada malam hari saat bertemu seseorang.', null, 'beginner', 6, 1, false);
insert into public.question_options (id, question_id, option_text, is_correct, order_index) values
  ('70000000-0000-4000-8000-000000000011', '60000000-0000-4000-8000-000000000007', 'Good evening', true, 0),
  ('70000000-0000-4000-8000-000000000012', '60000000-0000-4000-8000-000000000007', 'Good morning', false, 1),
  ('70000000-0000-4000-8000-000000000013', '60000000-0000-4000-8000-000000000007', 'Good afternoon', false, 2),
  ('70000000-0000-4000-8000-000000000014', '60000000-0000-4000-8000-000000000007', 'Good day time', false, 3);

insert into public.questions (id, lesson_id, type, prompt, instruction, correct_answer, explanation, audio_text, difficulty, order_index, points, is_placement_question) values
  ('60000000-0000-4000-8000-000000000008', '30000000-0000-4000-8000-000000000001', 'true_false', '''Hi'' is more formal than ''Hello''.', 'Tentukan apakah pernyataan berikut benar atau salah.', 'False', '''Hi'' justru lebih santai/informal dibandingkan ''Hello'' yang bersifat lebih netral.', null, 'beginner', 7, 1, false);
insert into public.question_options (id, question_id, option_text, is_correct, order_index) values
  ('70000000-0000-4000-8000-000000000015', '60000000-0000-4000-8000-000000000008', 'True', false, 0),
  ('70000000-0000-4000-8000-000000000016', '60000000-0000-4000-8000-000000000008', 'False', true, 1);

insert into public.questions (id, lesson_id, type, prompt, instruction, correct_answer, explanation, audio_text, difficulty, order_index, points, is_placement_question) values
  ('60000000-0000-4000-8000-000000000009', '30000000-0000-4000-8000-000000000001', 'fill_blank', 'Where ___ you from?', 'Lengkapi kalimat tanya dengan kata kerja to be yang tepat.', 'are', 'Subjek ''you'' berpasangan dengan kata kerja to be ''are''.', null, 'beginner', 8, 1, false);

insert into public.questions (id, lesson_id, type, prompt, instruction, correct_answer, explanation, audio_text, difficulty, order_index, points, is_placement_question) values
  ('60000000-0000-4000-8000-000000000010', '30000000-0000-4000-8000-000000000001', 'translation', 'Terjemahkan ke Bahasa Inggris: ''Saya dari Indonesia.''', 'Terjemahkan kalimat berikut ke dalam Bahasa Inggris.', 'I am from Indonesia', '''Saya dari Indonesia'' diterjemahkan menjadi ''I am from Indonesia'' menggunakan struktur Subjek + am + from + Negara.', null, 'beginner', 9, 1, false);

insert into public.questions (id, lesson_id, type, prompt, instruction, correct_answer, explanation, audio_text, difficulty, order_index, points, is_placement_question) values
  ('60000000-0000-4000-8000-000000000011', '30000000-0000-4000-8000-000000000001', 'speaking', 'Nice to meet you.', 'Ucapkan kalimat berikut dengan lafal yang jelas: ''Nice to meet you.''', 'Nice to meet you', 'Latihan ini membantu Anda melafalkan ungkapan perkenalan dengan intonasi yang natural.', null, 'beginner', 10, 1, false);

-- ----- Lesson: The Alphabet (Alfabet dan Pengucapan) -----
insert into public.lessons (id, unit_id, title, slug, description, learning_objectives, explanation, grammar_notes, common_mistakes, estimated_minutes, xp_reward, order_index, force_unlocked, is_published) values
  ('30000000-0000-4000-8000-000000000002', '20000000-0000-4000-8000-000000000001', 'The Alphabet', 'the-alphabet', 'Pelajari 26 huruf alfabet Bahasa Inggris beserta cara pengucapannya yang benar.', array['Mengenal 26 huruf alfabet Bahasa Inggris','Melafalkan setiap huruf dengan benar','Mengeja nama sendiri menggunakan alfabet','Membedakan huruf vokal dan konsonan']::text[], 'Alfabet Bahasa Inggris terdiri dari 26 huruf, dimulai dari A hingga Z. Setiap huruf memiliki cara pengucapan tersendiri yang seringkali berbeda dari cara membacanya dalam Bahasa Indonesia, misalnya huruf ''G'' dibaca ''jee'', bukan ''ge'', dan huruf ''J'' dibaca ''jay'', bukan ''je''. Menguasai pelafalan alfabet sangat penting karena akan digunakan saat mengeja nama, alamat email, atau kode tertentu (spelling out loud) dalam percakapan sehari-hari. Huruf alfabet dibagi menjadi vokal (A, E, I, O, U) dan konsonan (huruf lainnya), dan keduanya memiliki pola pengucapan yang berbeda.', 'Tidak ada aturan tata bahasa khusus untuk alfabet, namun perhatikan bahwa pelafalan huruf dalam Bahasa Inggris mengikuti sistem fonetik Inggris, bukan fonetik Indonesia, sehingga penting untuk berlatih mendengarkan dan menirukan pelafalan asli.', 'Kesalahan umum termasuk melafalkan huruf ''G'' seperti ''ge'' padahal seharusnya ''jee'', melafalkan ''J'' seperti ''je'' padahal seharusnya ''jay'', dan mengucapkan huruf ''W'' seperti ''we'' padahal seharusnya ''dabl-yu''. Pelajar Indonesia juga sering bingung antara huruf ''E'' (dibaca ''ii'') dan huruf ''I'' (dibaca ''ai'') karena pelafalannya bertukar dari sistem fonetik Indonesia.', 10, 20, 0, false, true);

insert into public.vocabulary (id, lesson_id, english_word, indonesian_meaning, phonetic, example_sentence, example_translation, word_type, order_index) values
  ('40000000-0000-4000-8000-000000000013', '30000000-0000-4000-8000-000000000002', 'A', 'Huruf A', 'ay', 'A is for Apple.', 'A untuk Apple.', 'letter', 0),
  ('40000000-0000-4000-8000-000000000014', '30000000-0000-4000-8000-000000000002', 'B', 'Huruf B', 'bee', 'B is for Banana.', 'B untuk Banana.', 'letter', 1),
  ('40000000-0000-4000-8000-000000000015', '30000000-0000-4000-8000-000000000002', 'G', 'Huruf G', 'jee', 'G is for Grape.', 'G untuk Grape.', 'letter', 2),
  ('40000000-0000-4000-8000-000000000016', '30000000-0000-4000-8000-000000000002', 'J', 'Huruf J', 'jay', 'J is for Juice.', 'J untuk Juice.', 'letter', 3),
  ('40000000-0000-4000-8000-000000000017', '30000000-0000-4000-8000-000000000002', 'W', 'Huruf W', 'dabl-yu', 'W is for Water.', 'W untuk Water.', 'letter', 4);

insert into public.lesson_examples (id, lesson_id, english_text, indonesian_text, explanation, order_index) values
  ('50000000-0000-4000-8000-000000000007', '30000000-0000-4000-8000-000000000002', 'Can you spell your name, please?', 'Bisakah kamu mengeja namamu?', 'Digunakan saat meminta seseorang mengeja nama menggunakan alfabet.', 0),
  ('50000000-0000-4000-8000-000000000008', '30000000-0000-4000-8000-000000000002', 'My name is spelled A-N-D-I.', 'Nama saya dieja A-N-D-I.', 'Contoh cara mengeja nama huruf demi huruf.', 1);

insert into public.questions (id, lesson_id, type, prompt, instruction, correct_answer, explanation, audio_text, difficulty, order_index, points, is_placement_question) values
  ('60000000-0000-4000-8000-000000000012', '30000000-0000-4000-8000-000000000002', 'multiple_choice', 'How do you pronounce the letter ''G''?', 'Pilih pelafalan yang benar untuk huruf G.', 'jee', 'Huruf G dilafalkan ''jee'' dalam Bahasa Inggris.', null, 'beginner', 0, 1, false);
insert into public.question_options (id, question_id, option_text, is_correct, order_index) values
  ('70000000-0000-4000-8000-000000000017', '60000000-0000-4000-8000-000000000012', 'jee', true, 0),
  ('70000000-0000-4000-8000-000000000018', '60000000-0000-4000-8000-000000000012', 'ge', false, 1),
  ('70000000-0000-4000-8000-000000000019', '60000000-0000-4000-8000-000000000012', 'gee-yu', false, 2),
  ('70000000-0000-4000-8000-000000000020', '60000000-0000-4000-8000-000000000012', 'jay', false, 3);

insert into public.questions (id, lesson_id, type, prompt, instruction, correct_answer, explanation, audio_text, difficulty, order_index, points, is_placement_question) values
  ('60000000-0000-4000-8000-000000000013', '30000000-0000-4000-8000-000000000002', 'true_false', 'The letter ''A'' is a consonant.', 'Tentukan benar atau salah.', 'False', 'Huruf A adalah vokal, bukan konsonan.', null, 'beginner', 1, 1, false);
insert into public.question_options (id, question_id, option_text, is_correct, order_index) values
  ('70000000-0000-4000-8000-000000000021', '60000000-0000-4000-8000-000000000013', 'True', false, 0),
  ('70000000-0000-4000-8000-000000000022', '60000000-0000-4000-8000-000000000013', 'False', true, 1);

insert into public.questions (id, lesson_id, type, prompt, instruction, correct_answer, explanation, audio_text, difficulty, order_index, points, is_placement_question) values
  ('60000000-0000-4000-8000-000000000014', '30000000-0000-4000-8000-000000000002', 'fill_blank', 'Please spell your name letter by ___.', 'Lengkapi kalimat dengan kata yang tepat.', 'letter', '''Letter by letter'' berarti huruf demi huruf.', null, 'beginner', 2, 1, false);

insert into public.questions (id, lesson_id, type, prompt, instruction, correct_answer, explanation, audio_text, difficulty, order_index, points, is_placement_question) values
  ('60000000-0000-4000-8000-000000000015', '30000000-0000-4000-8000-000000000002', 'listening', 'Listen and choose the letter you hear.', 'Dengarkan audio dan pilih huruf yang sesuai.', 'J', 'Huruf ''J'' dilafalkan ''jay''.', 'jay', 'beginner', 3, 1, false);
insert into public.question_options (id, question_id, option_text, is_correct, order_index) values
  ('70000000-0000-4000-8000-000000000023', '60000000-0000-4000-8000-000000000015', 'J', true, 0),
  ('70000000-0000-4000-8000-000000000024', '60000000-0000-4000-8000-000000000015', 'G', false, 1),
  ('70000000-0000-4000-8000-000000000025', '60000000-0000-4000-8000-000000000015', 'K', false, 2),
  ('70000000-0000-4000-8000-000000000026', '60000000-0000-4000-8000-000000000015', 'Y', false, 3);

insert into public.questions (id, lesson_id, type, prompt, instruction, correct_answer, explanation, audio_text, difficulty, order_index, points, is_placement_question) values
  ('60000000-0000-4000-8000-000000000016', '30000000-0000-4000-8000-000000000002', 'sentence_arrangement', 'for / Apple / is / A', 'Susun menjadi kalimat yang benar.', 'A is for Apple', 'Pola yang benar: Huruf + is for + Kata benda.', null, 'beginner', 4, 1, false);

-- ----- Lesson: Numbers 1 to 20 (Angka 1-100) -----
insert into public.lessons (id, unit_id, title, slug, description, learning_objectives, explanation, grammar_notes, common_mistakes, estimated_minutes, xp_reward, order_index, force_unlocked, is_published) values
  ('30000000-0000-4000-8000-000000000003', '20000000-0000-4000-8000-000000000002', 'Numbers 1 to 20', 'numbers-1-to-20', 'Pelajari cara menyebutkan angka 1 hingga 20 dalam Bahasa Inggris.', array['Menyebutkan angka 1 sampai 20 dengan benar','Menggunakan angka dalam kalimat sederhana','Membedakan pengucapan angka yang mirip seperti 13 dan 30','Menghitung benda menggunakan angka Bahasa Inggris']::text[], 'Angka dalam Bahasa Inggris dari 1 hingga 12 memiliki bentuk unik yang harus dihafalkan satu per satu: one, two, three, four, five, six, seven, eight, nine, ten, eleven, twelve. Mulai dari angka 13 hingga 19, pola penamaannya mengikuti akhiran ''-teen'', seperti thirteen, fourteen, fifteen, hingga nineteen. Angka 20 disebut ''twenty'' dan menjadi dasar untuk pola angka puluhan selanjutnya seperti thirty, forty, dan seterusnya. Penting untuk berlatih membedakan pengucapan angka yang terdengar mirip, misalnya ''thirteen'' (13) dan ''thirty'' (30), karena penekanan suku kata (stress) yang berbeda menentukan maknanya.', 'Angka dalam Bahasa Inggris berfungsi sebagai kata sifat (adjective) yang diletakkan sebelum kata benda, contohnya ''three books'' (tiga buku), dan tidak memerlukan kata bantu jumlah seperti dalam Bahasa Indonesia (misalnya ''buah'' atau ''ekor'').', 'Pelajar Indonesia sering salah menekankan suku kata pada angka ''-teen'' (13-19) sehingga terdengar seperti angka puluhan ''-ty'' (30, 40, dst), misalnya mengucapkan ''fourteen'' (14) namun terdengar seperti ''forty'' (40). Kesalahan lain adalah menambahkan ''s'' pada angka saat digunakan sebagai kata sifat, seperti mengatakan ''threes books'' padahal seharusnya ''three books''.', 10, 20, 0, false, true);

insert into public.vocabulary (id, lesson_id, english_word, indonesian_meaning, phonetic, example_sentence, example_translation, word_type, order_index) values
  ('40000000-0000-4000-8000-000000000018', '30000000-0000-4000-8000-000000000003', 'one', 'satu', 'wan', 'I have one apple.', 'Saya punya satu apel.', 'number', 0),
  ('40000000-0000-4000-8000-000000000019', '30000000-0000-4000-8000-000000000003', 'seven', 'tujuh', 'seh-ven', 'There are seven days in a week.', 'Ada tujuh hari dalam satu minggu.', 'number', 1),
  ('40000000-0000-4000-8000-000000000020', '30000000-0000-4000-8000-000000000003', 'thirteen', 'tiga belas', 'thur-TEEN', 'She is thirteen years old.', 'Dia berumur tiga belas tahun.', 'number', 2),
  ('40000000-0000-4000-8000-000000000021', '30000000-0000-4000-8000-000000000003', 'twenty', 'dua puluh', 'TWEN-tee', 'I have twenty dollars.', 'Saya punya dua puluh dolar.', 'number', 3);

insert into public.lesson_examples (id, lesson_id, english_text, indonesian_text, explanation, order_index) values
  ('50000000-0000-4000-8000-000000000009', '30000000-0000-4000-8000-000000000003', 'How many apples do you have?', 'Berapa banyak apel yang kamu punya?', 'Pertanyaan untuk menanyakan jumlah benda menggunakan how many.', 0),
  ('50000000-0000-4000-8000-000000000010', '30000000-0000-4000-8000-000000000003', 'I have five apples.', 'Saya punya lima apel.', 'Jawaban dengan angka lima (five) sebelum kata benda apples.', 1);

insert into public.questions (id, lesson_id, type, prompt, instruction, correct_answer, explanation, audio_text, difficulty, order_index, points, is_placement_question) values
  ('60000000-0000-4000-8000-000000000017', '30000000-0000-4000-8000-000000000003', 'multiple_choice', 'Choose the correct spelling for the number 15.', 'Pilih penulisan yang benar untuk angka 15.', 'fifteen', 'Angka 15 ditulis ''fifteen''.', null, 'beginner', 0, 1, false);
insert into public.question_options (id, question_id, option_text, is_correct, order_index) values
  ('70000000-0000-4000-8000-000000000027', '60000000-0000-4000-8000-000000000017', 'fifteen', true, 0),
  ('70000000-0000-4000-8000-000000000028', '60000000-0000-4000-8000-000000000017', 'fiveteen', false, 1),
  ('70000000-0000-4000-8000-000000000029', '60000000-0000-4000-8000-000000000017', 'fifty', false, 2),
  ('70000000-0000-4000-8000-000000000030', '60000000-0000-4000-8000-000000000017', 'fivety', false, 3);

insert into public.questions (id, lesson_id, type, prompt, instruction, correct_answer, explanation, audio_text, difficulty, order_index, points, is_placement_question) values
  ('60000000-0000-4000-8000-000000000018', '30000000-0000-4000-8000-000000000003', 'fill_blank', 'There are ___ (7) days in a week.', 'Tulis angka 7 dalam Bahasa Inggris.', 'seven', 'Angka 7 dalam Bahasa Inggris adalah ''seven''.', null, 'beginner', 1, 1, false);

insert into public.questions (id, lesson_id, type, prompt, instruction, correct_answer, explanation, audio_text, difficulty, order_index, points, is_placement_question) values
  ('60000000-0000-4000-8000-000000000019', '30000000-0000-4000-8000-000000000003', 'true_false', '''Thirty'' means 13.', 'Tentukan benar atau salah.', 'False', '''Thirty'' berarti 30, sedangkan 13 adalah ''thirteen''.', null, 'beginner', 2, 1, false);
insert into public.question_options (id, question_id, option_text, is_correct, order_index) values
  ('70000000-0000-4000-8000-000000000031', '60000000-0000-4000-8000-000000000019', 'True', false, 0),
  ('70000000-0000-4000-8000-000000000032', '60000000-0000-4000-8000-000000000019', 'False', true, 1);

insert into public.questions (id, lesson_id, type, prompt, instruction, correct_answer, explanation, audio_text, difficulty, order_index, points, is_placement_question) values
  ('60000000-0000-4000-8000-000000000020', '30000000-0000-4000-8000-000000000003', 'listening', 'Listen and choose the number you hear.', 'Dengarkan audio dan pilih angka yang sesuai.', 'eighteen', 'Kata yang diucapkan adalah ''eighteen'' (18).', 'eighteen', 'beginner', 3, 1, false);
insert into public.question_options (id, question_id, option_text, is_correct, order_index) values
  ('70000000-0000-4000-8000-000000000033', '60000000-0000-4000-8000-000000000020', 'eighteen', true, 0),
  ('70000000-0000-4000-8000-000000000034', '60000000-0000-4000-8000-000000000020', 'eighty', false, 1),
  ('70000000-0000-4000-8000-000000000035', '60000000-0000-4000-8000-000000000020', 'eight', false, 2),
  ('70000000-0000-4000-8000-000000000036', '60000000-0000-4000-8000-000000000020', 'eighteenth', false, 3);

insert into public.questions (id, lesson_id, type, prompt, instruction, correct_answer, explanation, audio_text, difficulty, order_index, points, is_placement_question) values
  ('60000000-0000-4000-8000-000000000021', '30000000-0000-4000-8000-000000000003', 'sentence_arrangement', 'have / apples / I / five', 'Susun kata-kata menjadi kalimat yang benar.', 'I have five apples', 'Struktur yang benar: Subjek + have + angka + kata benda.', null, 'beginner', 4, 1, false);

-- ----- Lesson: Am, Is, Are - The Verb To Be (Kata Kerja To Be) -----
insert into public.lessons (id, unit_id, title, slug, description, learning_objectives, explanation, grammar_notes, common_mistakes, estimated_minutes, xp_reward, order_index, force_unlocked, is_published) values
  ('30000000-0000-4000-8000-000000000004', '20000000-0000-4000-8000-000000000007', 'Am, Is, Are - The Verb To Be', 'am-is-are-the-verb-to-be', 'Pelajari cara menggunakan am, is, dan are dengan tepat sesuai subjek kalimat.', array['Memahami penggunaan am, is, are sesuai subjek','Membentuk kalimat positif dengan to be','Membentuk kalimat negatif dengan to be','Membentuk kalimat tanya dengan to be']::text[], 'Kata kerja ''to be'' dalam bentuk present tense memiliki tiga bentuk: am, is, dan are, yang penggunaannya bergantung pada subjek kalimat. ''Am'' digunakan hanya dengan subjek ''I'', misalnya ''I am happy''. ''Is'' digunakan dengan subjek tunggal seperti he, she, it, atau nama orang/benda tunggal, misalnya ''She is a teacher'' atau ''The cat is small''. ''Are'' digunakan dengan subjek jamak seperti we, you, they, atau lebih dari satu orang/benda, misalnya ''They are students'' atau ''You are welcome''.

Untuk membentuk kalimat negatif, tambahkan kata ''not'' setelah kata kerja to be, seperti ''I am not tired'', ''She is not late'', atau ''They are not here''. Untuk membentuk kalimat tanya, posisi kata kerja to be dan subjek dibalik (inversi), seperti ''Are you ready?'' atau ''Is he your friend?''.', 'Pola dasar: I + am, He/She/It + is, You/We/They + are. Bentuk negatif menambahkan ''not'' setelah to be (am not, is not/isn''t, are not/aren''t), dan bentuk tanya membalik posisi to be ke depan subjek.', 'Kesalahan umum termasuk menggunakan ''is'' untuk semua subjek tanpa memperhatikan jumlahnya, misalnya mengatakan ''They is happy'' padahal seharusnya ''They are happy''. Pelajar juga sering menghilangkan kata kerja to be sepenuhnya karena dalam Bahasa Indonesia tidak ada kata ''adalah'' yang wajib digunakan, seperti mengatakan ''She happy'' padahal seharusnya ''She is happy''.', 12, 20, 0, false, true);

insert into public.vocabulary (id, lesson_id, english_word, indonesian_meaning, phonetic, example_sentence, example_translation, word_type, order_index) values
  ('40000000-0000-4000-8000-000000000022', '30000000-0000-4000-8000-000000000004', 'am', 'adalah (untuk I)', 'am', 'I am a student.', 'Saya adalah seorang pelajar.', 'verb', 0),
  ('40000000-0000-4000-8000-000000000023', '30000000-0000-4000-8000-000000000004', 'is', 'adalah (untuk dia/itu)', 'iz', 'He is my brother.', 'Dia adalah kakak saya.', 'verb', 1),
  ('40000000-0000-4000-8000-000000000024', '30000000-0000-4000-8000-000000000004', 'are', 'adalah (untuk jamak/you)', 'ar', 'We are friends.', 'Kami adalah teman.', 'verb', 2),
  ('40000000-0000-4000-8000-000000000025', '30000000-0000-4000-8000-000000000004', 'not', 'tidak', 'not', 'She is not busy.', 'Dia tidak sibuk.', 'adverb', 3);

insert into public.lesson_examples (id, lesson_id, english_text, indonesian_text, explanation, order_index) values
  ('50000000-0000-4000-8000-000000000011', '30000000-0000-4000-8000-000000000004', 'Is she your sister?', 'Apakah dia kakak/adikmu?', 'Kalimat tanya dengan to be ''is'' untuk subjek tunggal she.', 0),
  ('50000000-0000-4000-8000-000000000012', '30000000-0000-4000-8000-000000000004', 'No, she is not my sister. She is my friend.', 'Tidak, dia bukan kakak/adik saya. Dia teman saya.', 'Kalimat negatif dengan to be menggunakan ''is not''.', 1);

insert into public.questions (id, lesson_id, type, prompt, instruction, correct_answer, explanation, audio_text, difficulty, order_index, points, is_placement_question) values
  ('60000000-0000-4000-8000-000000000022', '30000000-0000-4000-8000-000000000004', 'multiple_choice', 'Choose the correct word: ''They ___ students.''', 'Pilih kata kerja to be yang tepat.', 'are', 'Subjek ''they'' adalah jamak, sehingga menggunakan ''are''.', null, 'beginner', 0, 1, false);
insert into public.question_options (id, question_id, option_text, is_correct, order_index) values
  ('70000000-0000-4000-8000-000000000037', '60000000-0000-4000-8000-000000000022', 'are', true, 0),
  ('70000000-0000-4000-8000-000000000038', '60000000-0000-4000-8000-000000000022', 'is', false, 1),
  ('70000000-0000-4000-8000-000000000039', '60000000-0000-4000-8000-000000000022', 'am', false, 2),
  ('70000000-0000-4000-8000-000000000040', '60000000-0000-4000-8000-000000000022', 'be', false, 3);

insert into public.questions (id, lesson_id, type, prompt, instruction, correct_answer, explanation, audio_text, difficulty, order_index, points, is_placement_question) values
  ('60000000-0000-4000-8000-000000000023', '30000000-0000-4000-8000-000000000004', 'fill_blank', 'I ___ happy today.', 'Lengkapi dengan kata kerja to be yang tepat.', 'am', 'Subjek ''I'' selalu menggunakan ''am''.', null, 'beginner', 1, 1, false);

insert into public.questions (id, lesson_id, type, prompt, instruction, correct_answer, explanation, audio_text, difficulty, order_index, points, is_placement_question) values
  ('60000000-0000-4000-8000-000000000024', '30000000-0000-4000-8000-000000000004', 'true_false', '''He is a doctor'' is grammatically correct.', 'Tentukan benar atau salah.', 'True', '''He'' adalah subjek tunggal sehingga tepat menggunakan ''is''.', null, 'beginner', 2, 1, false);
insert into public.question_options (id, question_id, option_text, is_correct, order_index) values
  ('70000000-0000-4000-8000-000000000041', '60000000-0000-4000-8000-000000000024', 'True', true, 0),
  ('70000000-0000-4000-8000-000000000042', '60000000-0000-4000-8000-000000000024', 'False', false, 1);

insert into public.questions (id, lesson_id, type, prompt, instruction, correct_answer, explanation, audio_text, difficulty, order_index, points, is_placement_question) values
  ('60000000-0000-4000-8000-000000000025', '30000000-0000-4000-8000-000000000004', 'sentence_arrangement', 'not / tired / I / am', 'Susun menjadi kalimat negatif yang benar.', 'I am not tired', 'Struktur negatif: Subjek + am/is/are + not + kata sifat.', null, 'beginner', 3, 1, false);

insert into public.questions (id, lesson_id, type, prompt, instruction, correct_answer, explanation, audio_text, difficulty, order_index, points, is_placement_question) values
  ('60000000-0000-4000-8000-000000000026', '30000000-0000-4000-8000-000000000004', 'translation', 'Terjemahkan ke Bahasa Inggris: ''Mereka adalah guru.''', 'Terjemahkan kalimat berikut.', 'They are teachers', '''Mereka'' (they) menggunakan ''are'' karena jamak, diikuti ''teachers''.', null, 'beginner', 4, 1, false);

-- ----- Lesson: Simple Present Tense for Daily Routines (Simple Present Tense) -----
insert into public.lessons (id, unit_id, title, slug, description, learning_objectives, explanation, grammar_notes, common_mistakes, estimated_minutes, xp_reward, order_index, force_unlocked, is_published) values
  ('30000000-0000-4000-8000-000000000005', '20000000-0000-4000-8000-000000000008', 'Simple Present Tense for Daily Routines', 'simple-present-tense-for-daily-routines', 'Pelajari cara membentuk simple present tense untuk menceritakan kebiasaan dan aktivitas harian.', array['Membentuk kalimat simple present tense positif','Menggunakan akhiran -s/-es untuk subjek tunggal','Membentuk kalimat negatif dan tanya dalam simple present','Menceritakan aktivitas harian menggunakan simple present']::text[], 'Simple present tense digunakan untuk menceritakan kebiasaan, rutinitas, dan fakta umum. Untuk subjek I, you, we, they, kata kerja digunakan dalam bentuk dasarnya, misalnya ''I wake up at six'' atau ''They study English''. Namun, untuk subjek tunggal orang ketiga (he, she, it), kata kerja harus ditambahkan akhiran -s atau -es, misalnya ''She wakes up at six'' atau ''He watches TV every night''.

Untuk membentuk kalimat negatif, gunakan ''do not'' (don''t) untuk subjek I/you/we/they dan ''does not'' (doesn''t) untuk subjek he/she/it, diikuti kata kerja bentuk dasar, misalnya ''I don''t like coffee'' atau ''She doesn''t eat meat''. Untuk kalimat tanya, gunakan ''Do'' atau ''Does'' di awal kalimat, misalnya ''Do you like coffee?'' atau ''Does she eat meat?''.', 'Pola dasar: Subjek + kata kerja (+s/es untuk he/she/it). Negatif: Subjek + do/does + not + kata kerja dasar. Tanya: Do/Does + Subjek + kata kerja dasar + ?', 'Kesalahan umum termasuk lupa menambahkan -s/-es pada kata kerja untuk subjek he/she/it, misalnya mengatakan ''She go to school'' padahal seharusnya ''She goes to school''. Kesalahan lain adalah menambahkan -s pada kata kerja setelah ''does'' dalam kalimat tanya atau negatif, seperti ''Does she goes to school?'' padahal seharusnya ''Does she go to school?'' karena kata kerja setelah does/doesn''t harus dalam bentuk dasar.', 12, 20, 2, false, true);

insert into public.vocabulary (id, lesson_id, english_word, indonesian_meaning, phonetic, example_sentence, example_translation, word_type, order_index) values
  ('40000000-0000-4000-8000-000000000026', '30000000-0000-4000-8000-000000000005', 'wake up', 'bangun tidur', 'weyk ap', 'I wake up at six every morning.', 'Saya bangun tidur pukul enam setiap pagi.', 'verb', 0),
  ('40000000-0000-4000-8000-000000000027', '30000000-0000-4000-8000-000000000005', 'goes', 'pergi (untuk dia)', 'gohz', 'She goes to school by bus.', 'Dia pergi ke sekolah dengan bus.', 'verb', 1),
  ('40000000-0000-4000-8000-000000000028', '30000000-0000-4000-8000-000000000005', 'studies', 'belajar (untuk dia)', 'STA-deez', 'He studies English every day.', 'Dia belajar Bahasa Inggris setiap hari.', 'verb', 2),
  ('40000000-0000-4000-8000-000000000029', '30000000-0000-4000-8000-000000000005', 'usually', 'biasanya', 'YOO-zhoo-uh-lee', 'I usually have breakfast at seven.', 'Saya biasanya sarapan pukul tujuh.', 'adverb', 3);

insert into public.lesson_examples (id, lesson_id, english_text, indonesian_text, explanation, order_index) values
  ('50000000-0000-4000-8000-000000000013', '30000000-0000-4000-8000-000000000005', 'What time do you wake up every day?', 'Jam berapa kamu bangun setiap hari?', 'Kalimat tanya simple present menggunakan ''do'' untuk subjek ''you''.', 0),
  ('50000000-0000-4000-8000-000000000014', '30000000-0000-4000-8000-000000000005', 'She usually goes to school at seven.', 'Dia biasanya pergi ke sekolah pukul tujuh.', 'Kata kerja ''go'' berubah menjadi ''goes'' karena subjek ''she'' tunggal.', 1);

insert into public.questions (id, lesson_id, type, prompt, instruction, correct_answer, explanation, audio_text, difficulty, order_index, points, is_placement_question) values
  ('60000000-0000-4000-8000-000000000027', '30000000-0000-4000-8000-000000000005', 'multiple_choice', 'Choose the correct sentence.', 'Pilih kalimat yang benar secara tata bahasa.', 'She goes to school every day.', 'Subjek ''she'' tunggal, sehingga kata kerja ''go'' harus ditambah -es menjadi ''goes''.', null, 'beginner', 0, 1, false);
insert into public.question_options (id, question_id, option_text, is_correct, order_index) values
  ('70000000-0000-4000-8000-000000000043', '60000000-0000-4000-8000-000000000027', 'She goes to school every day.', true, 0),
  ('70000000-0000-4000-8000-000000000044', '60000000-0000-4000-8000-000000000027', 'She go to school every day.', false, 1),
  ('70000000-0000-4000-8000-000000000045', '60000000-0000-4000-8000-000000000027', 'She going to school every day.', false, 2),
  ('70000000-0000-4000-8000-000000000046', '60000000-0000-4000-8000-000000000027', 'She is go to school every day.', false, 3);

insert into public.questions (id, lesson_id, type, prompt, instruction, correct_answer, explanation, audio_text, difficulty, order_index, points, is_placement_question) values
  ('60000000-0000-4000-8000-000000000028', '30000000-0000-4000-8000-000000000005', 'fill_blank', 'He ___ (study) English every night.', 'Ubah kata kerja dalam kurung ke bentuk yang benar.', 'studies', 'Kata kerja ''study'' yang diakhiri ''y'' didahului konsonan berubah menjadi ''studies'' untuk subjek tunggal ''he''.', null, 'beginner', 1, 1, false);

insert into public.questions (id, lesson_id, type, prompt, instruction, correct_answer, explanation, audio_text, difficulty, order_index, points, is_placement_question) values
  ('60000000-0000-4000-8000-000000000029', '30000000-0000-4000-8000-000000000005', 'true_false', '''Does she goes to work?'' is grammatically correct.', 'Tentukan benar atau salah.', 'False', 'Setelah ''does'', kata kerja harus dalam bentuk dasar tanpa -s, sehingga seharusnya ''Does she go to work?''.', null, 'beginner', 2, 1, false);
insert into public.question_options (id, question_id, option_text, is_correct, order_index) values
  ('70000000-0000-4000-8000-000000000047', '60000000-0000-4000-8000-000000000029', 'True', false, 0),
  ('70000000-0000-4000-8000-000000000048', '60000000-0000-4000-8000-000000000029', 'False', true, 1);

insert into public.questions (id, lesson_id, type, prompt, instruction, correct_answer, explanation, audio_text, difficulty, order_index, points, is_placement_question) values
  ('60000000-0000-4000-8000-000000000030', '30000000-0000-4000-8000-000000000005', 'sentence_arrangement', 'up / wakes / She / at / six', 'Susun kata-kata berikut menjadi kalimat yang benar.', 'She wakes up at six', 'Struktur yang benar: Subjek + kata kerja (+s) + up + at + waktu.', null, 'beginner', 3, 1, false);

insert into public.questions (id, lesson_id, type, prompt, instruction, correct_answer, explanation, audio_text, difficulty, order_index, points, is_placement_question) values
  ('60000000-0000-4000-8000-000000000031', '30000000-0000-4000-8000-000000000005', 'translation', 'Terjemahkan ke Bahasa Inggris: ''Dia belajar Bahasa Inggris setiap hari.'' (dia perempuan)', 'Terjemahkan kalimat berikut ke Bahasa Inggris.', 'She studies English every day', 'Subjek ''she'' tunggal sehingga kata kerja ''study'' berubah menjadi ''studies''.', null, 'beginner', 4, 1, false);

-- ----- Lesson: Simple Past Tense: Regular and Irregular Verbs (Simple Past Tense) -----
insert into public.lessons (id, unit_id, title, slug, description, learning_objectives, explanation, grammar_notes, common_mistakes, estimated_minutes, xp_reward, order_index, force_unlocked, is_published) values
  ('30000000-0000-4000-8000-000000000006', '20000000-0000-4000-8000-000000000011', 'Simple Past Tense: Regular and Irregular Verbs', 'simple-past-tense-regular-irregular-verbs', 'Pelajari cara membentuk simple past tense menggunakan kata kerja beraturan dan tidak beraturan.', array['Membentuk simple past tense dengan kata kerja beraturan (-ed)','Mengenal bentuk past dari kata kerja tidak beraturan yang umum','Membentuk kalimat negatif dan tanya dalam simple past','Menceritakan kejadian di masa lalu']::text[], 'Simple past tense digunakan untuk menceritakan kejadian yang telah selesai terjadi di masa lampau. Untuk kata kerja beraturan (regular verbs), bentuk past dibuat dengan menambahkan akhiran ''-ed'' pada kata kerja dasar, misalnya ''play'' menjadi ''played'', atau ''work'' menjadi ''worked''. Namun, banyak kata kerja dalam Bahasa Inggris bersifat tidak beraturan (irregular verbs) dan memiliki bentuk past yang harus dihafalkan tersendiri, seperti ''go'' menjadi ''went'', ''eat'' menjadi ''ate'', dan ''see'' menjadi ''saw''.

Untuk membentuk kalimat negatif dalam simple past, gunakan ''did not'' (didn''t) diikuti kata kerja bentuk dasar, misalnya ''I didn''t go to school yesterday''. Untuk kalimat tanya, gunakan ''Did'' di awal kalimat diikuti subjek dan kata kerja dasar, misalnya ''Did you finish your homework?''. Perhatikan bahwa setelah ''did/didn''t'', kata kerja selalu dalam bentuk dasar, tidak dalam bentuk past.', 'Pola dasar kalimat positif: Subjek + kata kerja past (regular +ed / irregular hafalan). Negatif: Subjek + did not + kata kerja dasar. Tanya: Did + Subjek + kata kerja dasar + ?', 'Kesalahan umum termasuk menambahkan ''-ed'' pada kata kerja tidak beraturan, misalnya mengatakan ''goed'' padahal bentuk yang benar adalah ''went''. Kesalahan lain adalah menggunakan bentuk past setelah ''did/didn''t'', seperti ''Did you went there?'' padahal seharusnya ''Did you go there?'' karena kata kerja setelah ''did'' harus dalam bentuk dasar.', 15, 20, 0, false, true);

insert into public.vocabulary (id, lesson_id, english_word, indonesian_meaning, phonetic, example_sentence, example_translation, word_type, order_index) values
  ('40000000-0000-4000-8000-000000000030', '30000000-0000-4000-8000-000000000006', 'went', 'pergi (bentuk lampau)', 'went', 'I went to the market yesterday.', 'Saya pergi ke pasar kemarin.', 'verb', 0),
  ('40000000-0000-4000-8000-000000000031', '30000000-0000-4000-8000-000000000006', 'ate', 'makan (bentuk lampau)', 'eyt', 'She ate rice for lunch.', 'Dia makan nasi untuk makan siang.', 'verb', 1),
  ('40000000-0000-4000-8000-000000000032', '30000000-0000-4000-8000-000000000006', 'played', 'bermain (bentuk lampau)', 'pleyd', 'They played football last weekend.', 'Mereka bermain sepak bola akhir pekan lalu.', 'verb', 2),
  ('40000000-0000-4000-8000-000000000033', '30000000-0000-4000-8000-000000000006', 'yesterday', 'kemarin', 'YES-ter-day', 'I was busy yesterday.', 'Saya sibuk kemarin.', 'adverb', 3);

insert into public.lesson_examples (id, lesson_id, english_text, indonesian_text, explanation, order_index) values
  ('50000000-0000-4000-8000-000000000015', '30000000-0000-4000-8000-000000000006', 'Did you go to school yesterday?', 'Apakah kamu pergi ke sekolah kemarin?', 'Kalimat tanya simple past menggunakan ''did'' dan kata kerja dasar ''go''.', 0),
  ('50000000-0000-4000-8000-000000000016', '30000000-0000-4000-8000-000000000006', 'No, I didn''t go to school. I was sick.', 'Tidak, saya tidak pergi ke sekolah. Saya sakit.', 'Kalimat negatif menggunakan ''didn''t'' diikuti kata kerja dasar.', 1);

insert into public.questions (id, lesson_id, type, prompt, instruction, correct_answer, explanation, audio_text, difficulty, order_index, points, is_placement_question) values
  ('60000000-0000-4000-8000-000000000032', '30000000-0000-4000-8000-000000000006', 'multiple_choice', 'Choose the correct past tense of ''go''.', 'Pilih bentuk past yang benar dari kata kerja ''go''.', 'went', '''Go'' adalah kata kerja tidak beraturan dengan bentuk past ''went''.', null, 'beginner', 0, 1, false);
insert into public.question_options (id, question_id, option_text, is_correct, order_index) values
  ('70000000-0000-4000-8000-000000000049', '60000000-0000-4000-8000-000000000032', 'went', true, 0),
  ('70000000-0000-4000-8000-000000000050', '60000000-0000-4000-8000-000000000032', 'goed', false, 1),
  ('70000000-0000-4000-8000-000000000051', '60000000-0000-4000-8000-000000000032', 'gone', false, 2),
  ('70000000-0000-4000-8000-000000000052', '60000000-0000-4000-8000-000000000032', 'going', false, 3);

insert into public.questions (id, lesson_id, type, prompt, instruction, correct_answer, explanation, audio_text, difficulty, order_index, points, is_placement_question) values
  ('60000000-0000-4000-8000-000000000033', '30000000-0000-4000-8000-000000000006', 'fill_blank', 'I ___ (play) football yesterday.', 'Ubah kata kerja dalam kurung ke bentuk simple past.', 'played', '''Play'' adalah kata kerja beraturan, bentuk past-nya ditambah ''-ed'' menjadi ''played''.', null, 'beginner', 1, 1, false);

insert into public.questions (id, lesson_id, type, prompt, instruction, correct_answer, explanation, audio_text, difficulty, order_index, points, is_placement_question) values
  ('60000000-0000-4000-8000-000000000034', '30000000-0000-4000-8000-000000000006', 'true_false', '''She eated dinner at seven'' is grammatically correct.', 'Tentukan benar atau salah.', 'False', '''Eat'' adalah kata kerja tidak beraturan, bentuk past yang benar adalah ''ate'', bukan ''eated''.', null, 'beginner', 2, 1, false);
insert into public.question_options (id, question_id, option_text, is_correct, order_index) values
  ('70000000-0000-4000-8000-000000000053', '60000000-0000-4000-8000-000000000034', 'True', false, 0),
  ('70000000-0000-4000-8000-000000000054', '60000000-0000-4000-8000-000000000034', 'False', true, 1);

insert into public.questions (id, lesson_id, type, prompt, instruction, correct_answer, explanation, audio_text, difficulty, order_index, points, is_placement_question) values
  ('60000000-0000-4000-8000-000000000035', '30000000-0000-4000-8000-000000000006', 'sentence_arrangement', 'market / went / to / the / I / yesterday', 'Susun kata-kata menjadi kalimat yang benar.', 'I went to the market yesterday', 'Struktur yang benar: Subjek + kata kerja past + objek + waktu.', null, 'beginner', 3, 1, false);

insert into public.questions (id, lesson_id, type, prompt, instruction, correct_answer, explanation, audio_text, difficulty, order_index, points, is_placement_question) values
  ('60000000-0000-4000-8000-000000000036', '30000000-0000-4000-8000-000000000006', 'translation', 'Terjemahkan ke Bahasa Inggris: ''Mereka bermain sepak bola kemarin.''', 'Terjemahkan kalimat berikut ke Bahasa Inggris.', 'They played football yesterday', '''Play'' berubah menjadi ''played'' dalam bentuk simple past.', null, 'beginner', 4, 1, false);

-- ----- Lesson: Ordering Food at a Restaurant (Makanan dan Memesan) -----
insert into public.lessons (id, unit_id, title, slug, description, learning_objectives, explanation, grammar_notes, common_mistakes, estimated_minutes, xp_reward, order_index, force_unlocked, is_published) values
  ('30000000-0000-4000-8000-000000000007', '20000000-0000-4000-8000-000000000014', 'Ordering Food at a Restaurant', 'ordering-food-at-a-restaurant', 'Pelajari ungkapan penting untuk memesan makanan di restoran dalam Bahasa Inggris.', array['Menggunakan ungkapan untuk memesan makanan dan minuman','Menanyakan rekomendasi menu kepada pelayan','Meminta bill/tagihan setelah makan','Memahami percakapan umum antara pelanggan dan pelayan']::text[], 'Saat memesan makanan di restoran berbahasa Inggris, ungkapan yang umum digunakan adalah ''I would like...'' atau bentuk lebih santai ''Can I have...'' diikuti nama makanan atau minuman yang diinginkan, misalnya ''I would like a cup of coffee, please'' atau ''Can I have the chicken salad?''. Pelayan biasanya akan menyapa dengan ''Are you ready to order?'' atau menawarkan rekomendasi dengan ''Would you like to try our special today?''.

Jika Anda belum yakin dengan pilihan menu, Anda dapat bertanya ''What do you recommend?'' untuk meminta rekomendasi dari pelayan. Setelah selesai makan, untuk meminta tagihan, gunakan ungkapan ''Can I have the bill, please?'' atau ''Check, please''. Kata ''please'' penting ditambahkan di akhir kalimat permintaan agar terdengar lebih sopan.', 'Ungkapan permintaan sopan umumnya menggunakan struktur ''I would like...'' (lebih formal) atau ''Can I have...?'' (lebih santai), keduanya diikuti kata benda (noun) tanpa memerlukan kata kerja tambahan.', 'Kesalahan umum termasuk mengatakan ''I want...'' yang terdengar terlalu langsung dan kurang sopan dibandingkan ''I would like...''. Pelajar juga sering menerjemahkan secara literal ''minta tolong'' menjadi ''help me'' saat memesan, padahal ungkapan yang tepat cukup ''Can I have...'' atau ''I would like...'' tanpa kata ''help''.', 12, 20, 3, false, true);

insert into public.vocabulary (id, lesson_id, english_word, indonesian_meaning, phonetic, example_sentence, example_translation, word_type, order_index) values
  ('40000000-0000-4000-8000-000000000034', '30000000-0000-4000-8000-000000000007', 'menu', 'daftar menu', 'MEN-yoo', 'Can I see the menu, please?', 'Bisakah saya melihat daftar menu?', 'noun', 0),
  ('40000000-0000-4000-8000-000000000035', '30000000-0000-4000-8000-000000000007', 'order', 'memesan', 'OR-der', 'Are you ready to order?', 'Apakah kamu siap memesan?', 'verb', 1),
  ('40000000-0000-4000-8000-000000000036', '30000000-0000-4000-8000-000000000007', 'recommend', 'merekomendasikan', 'reh-kuh-MEND', 'What do you recommend?', 'Apa yang kamu rekomendasikan?', 'verb', 2),
  ('40000000-0000-4000-8000-000000000037', '30000000-0000-4000-8000-000000000007', 'bill', 'tagihan', 'bil', 'Can I have the bill, please?', 'Bisakah saya meminta tagihan?', 'noun', 3);

insert into public.lesson_examples (id, lesson_id, english_text, indonesian_text, explanation, order_index) values
  ('50000000-0000-4000-8000-000000000017', '30000000-0000-4000-8000-000000000007', 'I would like a cup of coffee, please.', 'Saya ingin segelas kopi, tolong.', 'Ungkapan sopan untuk memesan menggunakan ''I would like''.', 0),
  ('50000000-0000-4000-8000-000000000018', '30000000-0000-4000-8000-000000000007', 'Can I have the bill, please?', 'Bisakah saya meminta tagihan?', 'Ungkapan untuk meminta tagihan setelah makan.', 1);

insert into public.questions (id, lesson_id, type, prompt, instruction, correct_answer, explanation, audio_text, difficulty, order_index, points, is_placement_question) values
  ('60000000-0000-4000-8000-000000000037', '30000000-0000-4000-8000-000000000007', 'multiple_choice', 'Choose the most polite way to order food.', 'Pilih ungkapan yang paling sopan untuk memesan makanan.', 'I would like a chicken salad, please.', '''I would like...'' adalah ungkapan yang lebih sopan dibandingkan perintah langsung.', null, 'beginner', 0, 1, false);
insert into public.question_options (id, question_id, option_text, is_correct, order_index) values
  ('70000000-0000-4000-8000-000000000055', '60000000-0000-4000-8000-000000000037', 'I would like a chicken salad, please.', true, 0),
  ('70000000-0000-4000-8000-000000000056', '60000000-0000-4000-8000-000000000037', 'Give me a chicken salad.', false, 1),
  ('70000000-0000-4000-8000-000000000057', '60000000-0000-4000-8000-000000000037', 'I want chicken salad now.', false, 2),
  ('70000000-0000-4000-8000-000000000058', '60000000-0000-4000-8000-000000000037', 'Chicken salad, quick!', false, 3);

insert into public.questions (id, lesson_id, type, prompt, instruction, correct_answer, explanation, audio_text, difficulty, order_index, points, is_placement_question) values
  ('60000000-0000-4000-8000-000000000038', '30000000-0000-4000-8000-000000000007', 'fill_blank', 'What do you ___ for dessert?', 'Lengkapi kalimat untuk menanyakan rekomendasi.', 'recommend', '''Recommend'' berarti merekomendasikan, digunakan untuk menanyakan saran pelayan.', null, 'beginner', 1, 1, false);

insert into public.questions (id, lesson_id, type, prompt, instruction, correct_answer, explanation, audio_text, difficulty, order_index, points, is_placement_question) values
  ('60000000-0000-4000-8000-000000000039', '30000000-0000-4000-8000-000000000007', 'true_false', '''Check, please'' is used to ask for the bill.', 'Tentukan benar atau salah.', 'True', '''Check, please'' adalah ungkapan informal untuk meminta tagihan, terutama umum di Amerika.', null, 'beginner', 2, 1, false);
insert into public.question_options (id, question_id, option_text, is_correct, order_index) values
  ('70000000-0000-4000-8000-000000000059', '60000000-0000-4000-8000-000000000039', 'True', true, 0),
  ('70000000-0000-4000-8000-000000000060', '60000000-0000-4000-8000-000000000039', 'False', false, 1);

insert into public.questions (id, lesson_id, type, prompt, instruction, correct_answer, explanation, audio_text, difficulty, order_index, points, is_placement_question) values
  ('60000000-0000-4000-8000-000000000040', '30000000-0000-4000-8000-000000000007', 'sentence_arrangement', 'have / Can / the / please / bill / I', 'Susun kata-kata menjadi kalimat permintaan yang sopan.', 'Can I have the bill please', 'Struktur permintaan sopan: Can I have + kata benda + please?', null, 'beginner', 3, 1, false);

insert into public.questions (id, lesson_id, type, prompt, instruction, correct_answer, explanation, audio_text, difficulty, order_index, points, is_placement_question) values
  ('60000000-0000-4000-8000-000000000041', '30000000-0000-4000-8000-000000000007', 'translation', 'Terjemahkan ke Bahasa Inggris: ''Saya ingin segelas teh, tolong.''', 'Terjemahkan kalimat berikut ke Bahasa Inggris.', 'I would like a cup of tea please', 'Struktur ''I would like a cup of tea, please'' adalah cara sopan memesan minuman.', null, 'beginner', 4, 1, false);

-- ----- Lesson: Present Perfect Tense (Present Perfect Tense) -----
insert into public.lessons (id, unit_id, title, slug, description, learning_objectives, explanation, grammar_notes, common_mistakes, estimated_minutes, xp_reward, order_index, force_unlocked, is_published) values
  ('30000000-0000-4000-8000-000000000008', '20000000-0000-4000-8000-000000000016', 'Present Perfect Tense', 'present-perfect-tense-explained', 'Pelajari cara membentuk dan menggunakan present perfect tense untuk pengalaman dan kejadian yang berhubungan dengan sekarang.', array['Membentuk present perfect tense dengan have/has + past participle','Menggunakan present perfect untuk pengalaman hidup','Membedakan present perfect dengan simple past','Menggunakan ''already'', ''yet'', dan ''ever/never'' dengan tepat']::text[], 'Present perfect tense dibentuk dengan struktur ''have/has + past participle (verb 3)'', digunakan untuk menceritakan pengalaman yang pernah terjadi tanpa menyebutkan waktu pasti, misalnya ''I have visited Japan'' (saya pernah mengunjungi Jepang). Subjek I/you/we/they menggunakan ''have'', sedangkan subjek he/she/it menggunakan ''has'', contohnya ''She has finished her homework''.

Perbedaan utama present perfect dengan simple past adalah simple past digunakan untuk kejadian dengan waktu spesifik di masa lalu (contoh: ''I visited Japan in 2019''), sedangkan present perfect menekankan hubungan kejadian tersebut dengan masa sekarang atau tidak menyebutkan waktu pasti. Kata ''already'' digunakan untuk menyatakan sesuatu sudah terjadi lebih cepat dari yang diharapkan, ''yet'' digunakan dalam kalimat negatif/tanya untuk sesuatu yang belum terjadi, dan ''ever/never'' digunakan untuk menanyakan atau menyatakan pengalaman sepanjang hidup, seperti ''Have you ever been to London?'' atau ''I have never eaten sushi''.', 'Pola dasar: Subjek + have/has + past participle. Negatif: Subjek + have/has + not + past participle. Tanya: Have/Has + Subjek + past participle + ?', 'Kesalahan umum termasuk menggunakan present perfect dengan penunjuk waktu spesifik seperti ''yesterday'' atau ''last year'', misalnya ''I have visited Bali yesterday'' padahal seharusnya menggunakan simple past ''I visited Bali yesterday''. Kesalahan lain adalah menggunakan bentuk dasar kata kerja setelah have/has, seperti ''She has finish her homework'' padahal seharusnya ''She has finished her homework'' menggunakan past participle.', 15, 20, 0, false, true);

insert into public.vocabulary (id, lesson_id, english_word, indonesian_meaning, phonetic, example_sentence, example_translation, word_type, order_index) values
  ('40000000-0000-4000-8000-000000000038', '30000000-0000-4000-8000-000000000008', 'have visited', 'telah mengunjungi', 'hav VIZ-i-ted', 'I have visited Japan twice.', 'Saya telah mengunjungi Jepang dua kali.', 'phrase', 0),
  ('40000000-0000-4000-8000-000000000039', '30000000-0000-4000-8000-000000000008', 'already', 'sudah', 'ol-RED-ee', 'She has already finished her work.', 'Dia sudah menyelesaikan pekerjaannya.', 'adverb', 1),
  ('40000000-0000-4000-8000-000000000040', '30000000-0000-4000-8000-000000000008', 'yet', 'belum (dalam kalimat negatif/tanya)', 'yet', 'I haven''t finished yet.', 'Saya belum menyelesaikannya.', 'adverb', 2),
  ('40000000-0000-4000-8000-000000000041', '30000000-0000-4000-8000-000000000008', 'never', 'tidak pernah', 'NEH-ver', 'I have never eaten sushi.', 'Saya tidak pernah makan sushi.', 'adverb', 3);

insert into public.lesson_examples (id, lesson_id, english_text, indonesian_text, explanation, order_index) values
  ('50000000-0000-4000-8000-000000000019', '30000000-0000-4000-8000-000000000008', 'Have you ever been to London?', 'Apakah kamu pernah ke London?', 'Kalimat tanya present perfect menggunakan ''ever'' untuk menanyakan pengalaman.', 0),
  ('50000000-0000-4000-8000-000000000020', '30000000-0000-4000-8000-000000000008', 'Yes, I have visited London twice.', 'Ya, saya telah mengunjungi London dua kali.', 'Jawaban present perfect menyatakan pengalaman tanpa waktu spesifik.', 1);

insert into public.questions (id, lesson_id, type, prompt, instruction, correct_answer, explanation, audio_text, difficulty, order_index, points, is_placement_question) values
  ('60000000-0000-4000-8000-000000000042', '30000000-0000-4000-8000-000000000008', 'multiple_choice', 'Choose the correct sentence.', 'Pilih kalimat present perfect yang benar.', 'She has finished her homework.', 'Subjek ''she'' menggunakan ''has'' diikuti past participle ''finished''.', null, 'beginner', 0, 1, false);
insert into public.question_options (id, question_id, option_text, is_correct, order_index) values
  ('70000000-0000-4000-8000-000000000061', '60000000-0000-4000-8000-000000000042', 'She has finished her homework.', true, 0),
  ('70000000-0000-4000-8000-000000000062', '60000000-0000-4000-8000-000000000042', 'She has finish her homework.', false, 1),
  ('70000000-0000-4000-8000-000000000063', '60000000-0000-4000-8000-000000000042', 'She have finished her homework.', false, 2),
  ('70000000-0000-4000-8000-000000000064', '60000000-0000-4000-8000-000000000042', 'She finished has homework.', false, 3);

insert into public.questions (id, lesson_id, type, prompt, instruction, correct_answer, explanation, audio_text, difficulty, order_index, points, is_placement_question) values
  ('60000000-0000-4000-8000-000000000043', '30000000-0000-4000-8000-000000000008', 'fill_blank', 'I have ___ (never/eat) sushi before.', 'Lengkapi kalimat dengan bentuk yang tepat.', 'never eaten', '''Never'' diikuti past participle ''eaten'' dari kata kerja ''eat''.', null, 'beginner', 1, 1, false);

insert into public.questions (id, lesson_id, type, prompt, instruction, correct_answer, explanation, audio_text, difficulty, order_index, points, is_placement_question) values
  ('60000000-0000-4000-8000-000000000044', '30000000-0000-4000-8000-000000000008', 'true_false', '''I have visited Bali yesterday'' is grammatically correct.', 'Tentukan benar atau salah.', 'False', 'Present perfect tidak digunakan dengan penunjuk waktu spesifik seperti ''yesterday''; seharusnya menggunakan simple past ''I visited Bali yesterday''.', null, 'beginner', 2, 1, false);
insert into public.question_options (id, question_id, option_text, is_correct, order_index) values
  ('70000000-0000-4000-8000-000000000065', '60000000-0000-4000-8000-000000000044', 'True', false, 0),
  ('70000000-0000-4000-8000-000000000066', '60000000-0000-4000-8000-000000000044', 'False', true, 1);

insert into public.questions (id, lesson_id, type, prompt, instruction, correct_answer, explanation, audio_text, difficulty, order_index, points, is_placement_question) values
  ('60000000-0000-4000-8000-000000000045', '30000000-0000-4000-8000-000000000008', 'sentence_arrangement', 'been / have / ever / London / to / you', 'Susun kata-kata menjadi kalimat tanya yang benar.', 'have you ever been to London', 'Struktur kalimat tanya present perfect: Have + subjek + ever + past participle + ?', null, 'beginner', 3, 1, false);

insert into public.questions (id, lesson_id, type, prompt, instruction, correct_answer, explanation, audio_text, difficulty, order_index, points, is_placement_question) values
  ('60000000-0000-4000-8000-000000000046', '30000000-0000-4000-8000-000000000008', 'translation', 'Terjemahkan ke Bahasa Inggris: ''Saya belum menyelesaikan pekerjaan saya.''', 'Terjemahkan kalimat berikut ke Bahasa Inggris.', 'I have not finished my work yet', 'Struktur negatif present perfect dengan ''yet'' di akhir kalimat: Subjek + have/has + not + past participle + ... + yet.', null, 'beginner', 4, 1, false);

-- ----- Lesson: Writing Simple Emails (Menulis Email Sederhana) -----
insert into public.lessons (id, unit_id, title, slug, description, learning_objectives, explanation, grammar_notes, common_mistakes, estimated_minutes, xp_reward, order_index, force_unlocked, is_published) values
  ('30000000-0000-4000-8000-000000000009', '20000000-0000-4000-8000-000000000020', 'Writing Simple Emails', 'writing-simple-emails', 'Pelajari struktur dan ungkapan penting untuk menulis email formal dan informal dalam Bahasa Inggris.', array['Menyusun struktur email yang baik','Menggunakan salam pembuka dan penutup email yang tepat','Membedakan gaya bahasa email formal dan informal','Menulis permintaan atau pertanyaan dengan sopan melalui email']::text[], 'Email formal biasanya diawali dengan salam seperti ''Dear Mr. Smith,'' atau ''Dear Sir/Madam,'' jika nama penerima tidak diketahui, sedangkan email informal dapat diawali dengan ''Hi John,'' atau ''Hello Sarah,''. Bagian pembuka email formal sering menggunakan kalimat seperti ''I am writing to inquire about...'' atau ''I hope this email finds you well.'' untuk memulai dengan sopan.

Di bagian isi email, sampaikan tujuan Anda secara jelas dan ringkas. Untuk meminta sesuatu secara sopan, gunakan ungkapan seperti ''Could you please...'' atau ''I would appreciate it if you could...''. Bagian penutup email formal umumnya menggunakan ''Best regards,'' atau ''Sincerely,'' diikuti nama pengirim, sedangkan email informal dapat ditutup dengan ''Best,'' atau ''Take care,''.', 'Perhatikan penggunaan modal sopan seperti ''could'' dan ''would'' dalam permintaan formal, misalnya ''Could you please send me the file?'' yang terdengar lebih sopan dibandingkan ''Send me the file.''', 'Kesalahan umum termasuk menggunakan salam informal seperti ''Hi'' dalam email formal kepada atasan atau klien, padahal seharusnya ''Dear Mr./Ms. [Nama]''. Kesalahan lain adalah lupa mencantumkan salam penutup seperti ''Best regards'' sebelum nama pengirim, yang membuat email terasa tidak lengkap dan kurang profesional.', 15, 20, 4, false, true);

insert into public.vocabulary (id, lesson_id, english_word, indonesian_meaning, phonetic, example_sentence, example_translation, word_type, order_index) values
  ('40000000-0000-4000-8000-000000000042', '30000000-0000-4000-8000-000000000009', 'Dear', 'Kepada Yang Terhormat', 'deer', 'Dear Mr. Johnson,', 'Kepada Bapak Johnson yang terhormat,', 'phrase', 0),
  ('40000000-0000-4000-8000-000000000043', '30000000-0000-4000-8000-000000000009', 'regards', 'salam', 'ri-GARDZ', 'Best regards, Andi', 'Salam hangat, Andi', 'noun', 1),
  ('40000000-0000-4000-8000-000000000044', '30000000-0000-4000-8000-000000000009', 'inquire', 'menanyakan/bertanya', 'in-KWAI-er', 'I am writing to inquire about the schedule.', 'Saya menulis untuk menanyakan tentang jadwal.', 'verb', 2),
  ('40000000-0000-4000-8000-000000000045', '30000000-0000-4000-8000-000000000009', 'appreciate', 'menghargai', 'uh-PREE-shee-eyt', 'I would appreciate your quick response.', 'Saya akan menghargai tanggapan cepat Anda.', 'verb', 3);

insert into public.lesson_examples (id, lesson_id, english_text, indonesian_text, explanation, order_index) values
  ('50000000-0000-4000-8000-000000000021', '30000000-0000-4000-8000-000000000009', 'Dear Ms. Lee, I hope this email finds you well.', 'Kepada Ibu Lee, saya harap email ini menemukan Anda dalam keadaan baik.', 'Salam pembuka formal yang umum digunakan dalam email bisnis.', 0),
  ('50000000-0000-4000-8000-000000000022', '30000000-0000-4000-8000-000000000009', 'Could you please send me the report by Friday?', 'Bisakah Anda mengirimkan laporan tersebut kepada saya sebelum hari Jumat?', 'Permintaan sopan menggunakan ''Could you please...'' dalam email formal.', 1);

insert into public.questions (id, lesson_id, type, prompt, instruction, correct_answer, explanation, audio_text, difficulty, order_index, points, is_placement_question) values
  ('60000000-0000-4000-8000-000000000047', '30000000-0000-4000-8000-000000000009', 'multiple_choice', 'Choose the most appropriate formal greeting for an email.', 'Pilih salam pembuka yang paling tepat untuk email formal.', 'Dear Mr. Johnson,', '''Dear Mr. Johnson,'' adalah salam formal yang tepat untuk email bisnis.', null, 'beginner', 0, 1, false);
insert into public.question_options (id, question_id, option_text, is_correct, order_index) values
  ('70000000-0000-4000-8000-000000000067', '60000000-0000-4000-8000-000000000047', 'Dear Mr. Johnson,', true, 0),
  ('70000000-0000-4000-8000-000000000068', '60000000-0000-4000-8000-000000000047', 'Hey Johnson!', false, 1),
  ('70000000-0000-4000-8000-000000000069', '60000000-0000-4000-8000-000000000047', 'Yo Johnson,', false, 2),
  ('70000000-0000-4000-8000-000000000070', '60000000-0000-4000-8000-000000000047', 'What''s up Johnson,', false, 3);

insert into public.questions (id, lesson_id, type, prompt, instruction, correct_answer, explanation, audio_text, difficulty, order_index, points, is_placement_question) values
  ('60000000-0000-4000-8000-000000000048', '30000000-0000-4000-8000-000000000009', 'fill_blank', 'I would ___ it if you could send the file soon.', 'Lengkapi kalimat permintaan sopan.', 'appreciate', '''I would appreciate it if...'' adalah ungkapan sopan untuk meminta sesuatu.', null, 'beginner', 1, 1, false);

insert into public.questions (id, lesson_id, type, prompt, instruction, correct_answer, explanation, audio_text, difficulty, order_index, points, is_placement_question) values
  ('60000000-0000-4000-8000-000000000049', '30000000-0000-4000-8000-000000000009', 'true_false', '''Best regards'' is commonly used to close a formal email.', 'Tentukan benar atau salah.', 'True', '''Best regards'' adalah penutup email formal yang umum digunakan.', null, 'beginner', 2, 1, false);
insert into public.question_options (id, question_id, option_text, is_correct, order_index) values
  ('70000000-0000-4000-8000-000000000071', '60000000-0000-4000-8000-000000000049', 'True', true, 0),
  ('70000000-0000-4000-8000-000000000072', '60000000-0000-4000-8000-000000000049', 'False', false, 1);

insert into public.questions (id, lesson_id, type, prompt, instruction, correct_answer, explanation, audio_text, difficulty, order_index, points, is_placement_question) values
  ('60000000-0000-4000-8000-000000000050', '30000000-0000-4000-8000-000000000009', 'matching', 'Cocokkan bagian email ''Dear Mr. Smith,'' dengan fungsinya.', 'Pasangkan setiap bagian email dengan fungsinya yang tepat.', 'dear mr. smith=salam pembuka', '''Dear Mr. Smith,'' berfungsi sebagai salam pembuka formal dalam email.', null, 'beginner', 3, 1, false);

insert into public.questions (id, lesson_id, type, prompt, instruction, correct_answer, explanation, audio_text, difficulty, order_index, points, is_placement_question) values
  ('60000000-0000-4000-8000-000000000051', '30000000-0000-4000-8000-000000000009', 'translation', 'Terjemahkan ke Bahasa Inggris: ''Bisakah Anda mengirimkan laporan tersebut sebelum hari Jumat?''', 'Terjemahkan kalimat berikut ke Bahasa Inggris.', 'Could you please send the report before Friday', 'Struktur permintaan sopan: Could you please + kata kerja dasar + objek?', null, 'beginner', 4, 1, false);

-- ----- Lesson: Conditionals: Zero, First, and Second (Kalimat Pengandaian (Conditionals)) -----
insert into public.lessons (id, unit_id, title, slug, description, learning_objectives, explanation, grammar_notes, common_mistakes, estimated_minutes, xp_reward, order_index, force_unlocked, is_published) values
  ('30000000-0000-4000-8000-000000000010', '20000000-0000-4000-8000-000000000021', 'Conditionals: Zero, First, and Second', 'conditionals-zero-first-second', 'Pelajari perbedaan dan penggunaan zero, first, dan second conditional dalam Bahasa Inggris.', array['Membentuk dan menggunakan zero conditional untuk fakta umum','Membentuk dan menggunakan first conditional untuk kemungkinan nyata di masa depan','Membentuk dan menggunakan second conditional untuk situasi hipotetis','Membedakan ketiga jenis conditional berdasarkan konteks penggunaannya']::text[], 'Zero conditional digunakan untuk menyatakan fakta umum atau hal yang selalu benar, dengan struktur ''If + simple present, simple present'', misalnya ''If you heat ice, it melts'' (jika Anda memanaskan es, es akan mencair). Conditional ini menyatakan sebab-akibat yang selalu terjadi tanpa terkecuali.

First conditional digunakan untuk membicarakan kemungkinan nyata di masa depan, dengan struktur ''If + simple present, will + kata kerja dasar'', misalnya ''If it rains tomorrow, I will stay home'' (jika besok hujan, saya akan tinggal di rumah). Kondisi ini dianggap mungkin terjadi dan realistis.

Second conditional digunakan untuk membicarakan situasi hipotetis atau tidak nyata/tidak mungkin terjadi di masa sekarang atau masa depan, dengan struktur ''If + simple past, would + kata kerja dasar'', misalnya ''If I won the lottery, I would travel around the world'' (jika saya menang lotre, saya akan berkeliling dunia). Perhatikan bahwa meskipun menggunakan bentuk simple past (''won''), kalimat ini tidak menceritakan masa lalu, melainkan situasi imajinatif di masa sekarang atau masa depan.', 'Zero: If + present simple, present simple. First: If + present simple, will + verb. Second: If + past simple, would + verb. Klausa ''if'' dapat diletakkan di awal atau akhir kalimat, dan jika di awal, gunakan tanda koma sebelum klausa utama.', 'Kesalahan umum termasuk menggunakan ''will'' pada kedua klausa dalam first conditional, seperti ''If it will rain, I will stay home'' padahal seharusnya ''If it rains, I will stay home'' -- klausa ''if'' tetap menggunakan simple present. Kesalahan lain adalah menggunakan ''would'' di klausa ''if'' pada second conditional, seperti ''If I would win the lottery...'' padahal seharusnya ''If I won the lottery...'' karena klausa ''if'' menggunakan simple past, bukan ''would''.', 18, 20, 0, false, true);

insert into public.vocabulary (id, lesson_id, english_word, indonesian_meaning, phonetic, example_sentence, example_translation, word_type, order_index) values
  ('40000000-0000-4000-8000-000000000046', '30000000-0000-4000-8000-000000000010', 'if', 'jika', 'if', 'If you heat ice, it melts.', 'Jika Anda memanaskan es, es akan mencair.', 'conjunction', 0),
  ('40000000-0000-4000-8000-000000000047', '30000000-0000-4000-8000-000000000010', 'would', 'akan (hipotetis)', 'wood', 'If I won the lottery, I would travel.', 'Jika saya menang lotre, saya akan bepergian.', 'modal', 1),
  ('40000000-0000-4000-8000-000000000048', '30000000-0000-4000-8000-000000000010', 'hypothetical', 'hipotetis/andaian', 'hai-po-THET-i-kal', 'This is a hypothetical situation.', 'Ini adalah situasi hipotetis.', 'adjective', 2),
  ('40000000-0000-4000-8000-000000000049', '30000000-0000-4000-8000-000000000010', 'melt', 'mencair', 'melt', 'Ice melts when it gets warm.', 'Es mencair ketika menjadi hangat.', 'verb', 3);

insert into public.lesson_examples (id, lesson_id, english_text, indonesian_text, explanation, order_index) values
  ('50000000-0000-4000-8000-000000000023', '30000000-0000-4000-8000-000000000010', 'If it rains tomorrow, I will stay home.', 'Jika besok hujan, saya akan tinggal di rumah.', 'Contoh first conditional untuk kemungkinan nyata di masa depan.', 0),
  ('50000000-0000-4000-8000-000000000024', '30000000-0000-4000-8000-000000000010', 'If I had more time, I would learn a new language.', 'Jika saya punya lebih banyak waktu, saya akan belajar bahasa baru.', 'Contoh second conditional untuk situasi hipotetis yang tidak nyata.', 1);

insert into public.questions (id, lesson_id, type, prompt, instruction, correct_answer, explanation, audio_text, difficulty, order_index, points, is_placement_question) values
  ('60000000-0000-4000-8000-000000000052', '30000000-0000-4000-8000-000000000010', 'multiple_choice', 'Choose the correct first conditional sentence.', 'Pilih kalimat first conditional yang benar.', 'If it rains, I will stay home.', 'First conditional menggunakan simple present di klausa ''if'' dan ''will'' di klausa utama.', null, 'beginner', 0, 1, false);
insert into public.question_options (id, question_id, option_text, is_correct, order_index) values
  ('70000000-0000-4000-8000-000000000073', '60000000-0000-4000-8000-000000000052', 'If it rains, I will stay home.', true, 0),
  ('70000000-0000-4000-8000-000000000074', '60000000-0000-4000-8000-000000000052', 'If it will rain, I will stay home.', false, 1),
  ('70000000-0000-4000-8000-000000000075', '60000000-0000-4000-8000-000000000052', 'If it rains, I would stay home.', false, 2),
  ('70000000-0000-4000-8000-000000000076', '60000000-0000-4000-8000-000000000052', 'If it rained, I will stay home.', false, 3);

insert into public.questions (id, lesson_id, type, prompt, instruction, correct_answer, explanation, audio_text, difficulty, order_index, points, is_placement_question) values
  ('60000000-0000-4000-8000-000000000053', '30000000-0000-4000-8000-000000000010', 'fill_blank', 'If you heat ice, it ___ (melt).', 'Lengkapi kalimat zero conditional dengan bentuk yang tepat.', 'melts', 'Zero conditional menggunakan simple present pada kedua klausa, sehingga ''melt'' menjadi ''melts''.', null, 'beginner', 1, 1, false);

insert into public.questions (id, lesson_id, type, prompt, instruction, correct_answer, explanation, audio_text, difficulty, order_index, points, is_placement_question) values
  ('60000000-0000-4000-8000-000000000054', '30000000-0000-4000-8000-000000000010', 'true_false', 'Second conditional is used for real possibilities in the future.', 'Tentukan benar atau salah.', 'False', 'Second conditional digunakan untuk situasi hipotetis/tidak nyata, bukan kemungkinan nyata; kemungkinan nyata menggunakan first conditional.', null, 'beginner', 2, 1, false);
insert into public.question_options (id, question_id, option_text, is_correct, order_index) values
  ('70000000-0000-4000-8000-000000000077', '60000000-0000-4000-8000-000000000054', 'True', false, 0),
  ('70000000-0000-4000-8000-000000000078', '60000000-0000-4000-8000-000000000054', 'False', true, 1);

insert into public.questions (id, lesson_id, type, prompt, instruction, correct_answer, explanation, audio_text, difficulty, order_index, points, is_placement_question) values
  ('60000000-0000-4000-8000-000000000055', '30000000-0000-4000-8000-000000000010', 'sentence_arrangement', 'won / I / lottery / the / if / would / travel / I', 'Susun kata-kata menjadi kalimat second conditional yang benar.', 'if I won the lottery I would travel', 'Struktur second conditional: If + simple past, would + kata kerja dasar.', null, 'beginner', 3, 1, false);

insert into public.questions (id, lesson_id, type, prompt, instruction, correct_answer, explanation, audio_text, difficulty, order_index, points, is_placement_question) values
  ('60000000-0000-4000-8000-000000000056', '30000000-0000-4000-8000-000000000010', 'translation', 'Terjemahkan ke Bahasa Inggris: ''Jika saya punya lebih banyak uang, saya akan membeli rumah baru.''', 'Terjemahkan kalimat berikut ke Bahasa Inggris.', 'If I had more money I would buy a new house', 'Kalimat ini adalah situasi hipotetis, sehingga menggunakan second conditional: If + simple past, would + kata kerja dasar.', null, 'beginner', 4, 1, false);

-- ----- Lesson: Preparing for a Job Interview (Wawancara Kerja) -----
insert into public.lessons (id, unit_id, title, slug, description, learning_objectives, explanation, grammar_notes, common_mistakes, estimated_minutes, xp_reward, order_index, force_unlocked, is_published) values
  ('30000000-0000-4000-8000-000000000011', '20000000-0000-4000-8000-000000000024', 'Preparing for a Job Interview', 'preparing-for-a-job-interview', 'Pelajari ungkapan dan strategi penting untuk menghadapi wawancara kerja dalam Bahasa Inggris.', array['Menjawab pertanyaan umum wawancara kerja dengan percaya diri','Menggunakan ungkapan untuk menjelaskan kelebihan dan kekurangan diri','Mengajukan pertanyaan yang tepat kepada pewawancara','Menggunakan bahasa formal yang sesuai selama wawancara']::text[], 'Wawancara kerja dalam Bahasa Inggris sering dimulai dengan pertanyaan umum seperti ''Tell me about yourself'' atau ''Can you walk me through your resume?''. Saat menjawab, fokuslah pada pengalaman dan keterampilan yang relevan dengan posisi yang dilamar, dan jawab dengan struktur yang jelas dan ringkas.

Pertanyaan yang sering muncul lainnya adalah ''What are your strengths and weaknesses?''. Saat menjelaskan kelebihan, gunakan contoh konkret, misalnya ''One of my strengths is problem-solving; for example, I improved our team''s workflow.''. Saat menjelaskan kekurangan, pilih kelemahan yang jujur namun tunjukkan upaya untuk memperbaikinya, misalnya ''I sometimes struggle with public speaking, but I have been taking courses to improve.''

Di akhir wawancara, pewawancara biasanya bertanya ''Do you have any questions for us?''. Ini adalah kesempatan baik untuk menunjukkan ketertarikan Anda dengan bertanya hal seperti ''What does success look like in this role?'' atau ''What are the next steps in the hiring process?''.', 'Perhatikan penggunaan present perfect untuk menjelaskan pengalaman yang berkelanjutan, seperti ''I have worked in marketing for five years'', dan penggunaan modal ''would'' untuk menjelaskan rencana atau harapan, seperti ''I would love to contribute to your team.''', 'Kesalahan umum termasuk menjawab pertanyaan tentang kelemahan dengan jawaban yang terlalu negatif tanpa solusi, misalnya hanya mengatakan ''I am bad at time management'' tanpa menjelaskan upaya perbaikan. Kesalahan lain adalah tidak mempersiapkan pertanyaan untuk diajukan balik kepada pewawancara, yang dapat memberi kesan kurang tertarik pada posisi tersebut.', 18, 20, 3, false, true);

insert into public.vocabulary (id, lesson_id, english_word, indonesian_meaning, phonetic, example_sentence, example_translation, word_type, order_index) values
  ('40000000-0000-4000-8000-000000000050', '30000000-0000-4000-8000-000000000011', 'strength', 'kelebihan/kekuatan', 'strength', 'One of my strengths is teamwork.', 'Salah satu kelebihan saya adalah kerja sama tim.', 'noun', 0),
  ('40000000-0000-4000-8000-000000000051', '30000000-0000-4000-8000-000000000011', 'weakness', 'kelemahan', 'WEEK-nes', 'My weakness is public speaking.', 'Kelemahan saya adalah berbicara di depan umum.', 'noun', 1),
  ('40000000-0000-4000-8000-000000000052', '30000000-0000-4000-8000-000000000011', 'resume', 'riwayat hidup/CV', 'REH-zoo-may', 'Please review my resume.', 'Tolong tinjau riwayat hidup saya.', 'noun', 2),
  ('40000000-0000-4000-8000-000000000053', '30000000-0000-4000-8000-000000000011', 'contribute', 'berkontribusi', 'kon-TRIB-yoot', 'I want to contribute to your team''s success.', 'Saya ingin berkontribusi pada kesuksesan tim Anda.', 'verb', 3);

insert into public.lesson_examples (id, lesson_id, english_text, indonesian_text, explanation, order_index) values
  ('50000000-0000-4000-8000-000000000025', '30000000-0000-4000-8000-000000000011', 'Can you tell me about yourself?', 'Bisakah Anda menceritakan tentang diri Anda?', 'Pertanyaan pembuka umum dalam wawancara kerja.', 0),
  ('50000000-0000-4000-8000-000000000026', '30000000-0000-4000-8000-000000000011', 'One of my strengths is problem-solving.', 'Salah satu kelebihan saya adalah pemecahan masalah.', 'Contoh jawaban menjelaskan kelebihan diri dengan struktur yang jelas.', 1);

insert into public.questions (id, lesson_id, type, prompt, instruction, correct_answer, explanation, audio_text, difficulty, order_index, points, is_placement_question) values
  ('60000000-0000-4000-8000-000000000057', '30000000-0000-4000-8000-000000000011', 'multiple_choice', 'Choose the best response to ''What is your weakness?''', 'Pilih jawaban terbaik untuk pertanyaan tentang kelemahan.', 'I sometimes struggle with public speaking, but I am improving by taking courses.', 'Jawaban terbaik mengakui kelemahan secara jujur dan menunjukkan upaya perbaikan.', null, 'beginner', 0, 1, false);
insert into public.question_options (id, question_id, option_text, is_correct, order_index) values
  ('70000000-0000-4000-8000-000000000079', '60000000-0000-4000-8000-000000000057', 'I sometimes struggle with public speaking, but I am improving by taking courses.', true, 0),
  ('70000000-0000-4000-8000-000000000080', '60000000-0000-4000-8000-000000000057', 'I don''t have any weaknesses.', false, 1),
  ('70000000-0000-4000-8000-000000000081', '60000000-0000-4000-8000-000000000057', 'I am bad at everything.', false, 2),
  ('70000000-0000-4000-8000-000000000082', '60000000-0000-4000-8000-000000000057', 'That is a private matter.', false, 3);

insert into public.questions (id, lesson_id, type, prompt, instruction, correct_answer, explanation, audio_text, difficulty, order_index, points, is_placement_question) values
  ('60000000-0000-4000-8000-000000000058', '30000000-0000-4000-8000-000000000011', 'fill_blank', 'I want to ___ to your team''s success.', 'Lengkapi kalimat dengan kata kerja yang tepat.', 'contribute', '''Contribute'' berarti berkontribusi, sering digunakan saat menjelaskan motivasi melamar kerja.', null, 'beginner', 1, 1, false);

insert into public.questions (id, lesson_id, type, prompt, instruction, correct_answer, explanation, audio_text, difficulty, order_index, points, is_placement_question) values
  ('60000000-0000-4000-8000-000000000059', '30000000-0000-4000-8000-000000000011', 'true_false', 'It is a good idea to ask questions at the end of a job interview.', 'Tentukan benar atau salah.', 'True', 'Menanyakan pertanyaan di akhir wawancara menunjukkan ketertarikan dan inisiatif kandidat.', null, 'beginner', 2, 1, false);
insert into public.question_options (id, question_id, option_text, is_correct, order_index) values
  ('70000000-0000-4000-8000-000000000083', '60000000-0000-4000-8000-000000000059', 'True', true, 0),
  ('70000000-0000-4000-8000-000000000084', '60000000-0000-4000-8000-000000000059', 'False', false, 1);

insert into public.questions (id, lesson_id, type, prompt, instruction, correct_answer, explanation, audio_text, difficulty, order_index, points, is_placement_question) values
  ('60000000-0000-4000-8000-000000000060', '30000000-0000-4000-8000-000000000011', 'matching', 'Cocokkan istilah wawancara ''strength'' dengan artinya.', 'Pasangkan setiap istilah dengan artinya yang tepat.', 'strength=kelebihan', '''Strength'' berarti kelebihan atau kekuatan seseorang.', null, 'beginner', 3, 1, false);

insert into public.questions (id, lesson_id, type, prompt, instruction, correct_answer, explanation, audio_text, difficulty, order_index, points, is_placement_question) values
  ('60000000-0000-4000-8000-000000000061', '30000000-0000-4000-8000-000000000011', 'translation', 'Terjemahkan ke Bahasa Inggris: ''Saya memiliki lima tahun pengalaman di bidang pemasaran.''', 'Terjemahkan kalimat berikut ke Bahasa Inggris.', 'I have five years of experience in marketing', 'Struktur ini menggunakan present perfect untuk pengalaman yang relevan dengan konteks sekarang.', null, 'beginner', 4, 1, false);

-- ----- Lesson: Advanced Vocabulary in Context (Kosakata Tingkat Lanjut) -----
insert into public.lessons (id, unit_id, title, slug, description, learning_objectives, explanation, grammar_notes, common_mistakes, estimated_minutes, xp_reward, order_index, force_unlocked, is_published) values
  ('30000000-0000-4000-8000-000000000012', '20000000-0000-4000-8000-000000000026', 'Advanced Vocabulary in Context', 'advanced-vocabulary-in-context', 'Perluas kosakata tingkat lanjut untuk komunikasi yang lebih presisi dan bernuansa.', array['Memahami arti dan penggunaan kosakata tingkat lanjut','Menggunakan kosakata lanjut dalam kalimat yang tepat','Membedakan nuansa makna antara kata-kata yang mirip','Menerapkan kosakata lanjut dalam konteks profesional dan akademik']::text[], 'Pada level C1, penguasaan kosakata tingkat lanjut menjadi kunci untuk berkomunikasi secara presisi dan bernuansa, terutama dalam konteks profesional dan akademik. Kata seperti ''ubiquitous'' (ada di mana-mana) sering digunakan untuk menggambarkan sesuatu yang sangat umum ditemukan, misalnya ''Smartphones have become ubiquitous in modern society.'' Kata ''meticulous'' (teliti/cermat) menggambarkan seseorang yang sangat berhati-hati dan detail dalam pekerjaannya, misalnya ''She is meticulous about checking every detail of the report.''

Kata ''paradigm'' (paradigma) digunakan untuk merujuk pada suatu model atau kerangka berpikir yang mendasari suatu bidang, seperti dalam frasa ''paradigm shift'' yang berarti perubahan besar dalam cara berpikir atau melakukan sesuatu. Kata lain yang penting adalah ''ambiguous'' (ambigu), yang menggambarkan sesuatu yang memiliki lebih dari satu makna atau tidak jelas, misalnya ''The instructions were ambiguous and confused many readers.''

Menguasai kosakata tingkat lanjut seperti ini memungkinkan Anda mengekspresikan ide-ide kompleks dengan lebih efisien, tanpa harus menggunakan kalimat yang panjang dan berulang. Penting untuk memperhatikan konteks penggunaan setiap kata agar tidak salah makna, karena beberapa kata memiliki nuansa formal yang berbeda dari sinonimnya yang lebih umum.', 'Kata-kata tingkat lanjut seperti ini sering berupa kata sifat (adjective) atau kata benda abstrak (abstract noun), dan umumnya digunakan dalam register formal seperti tulisan akademik, laporan bisnis, atau presentasi profesional, bukan dalam percakapan sehari-hari yang santai.', 'Kesalahan umum termasuk menggunakan kosakata tingkat lanjut secara berlebihan dalam konteks informal sehingga terdengar kaku atau dipaksakan. Kesalahan lain adalah salah memahami nuansa makna, misalnya menyamakan ''ambiguous'' dengan ''ambitious'' karena kemiripan bentuk kata, padahal keduanya memiliki arti yang sangat berbeda.', 20, 20, 0, false, true);

insert into public.vocabulary (id, lesson_id, english_word, indonesian_meaning, phonetic, example_sentence, example_translation, word_type, order_index) values
  ('40000000-0000-4000-8000-000000000054', '30000000-0000-4000-8000-000000000012', 'ubiquitous', 'ada di mana-mana/lazim ditemukan', 'yoo-BIK-wi-tuhs', 'Smartphones have become ubiquitous in modern society.', 'Ponsel pintar telah menjadi sangat lazim ditemukan dalam masyarakat modern.', 'adjective', 0),
  ('40000000-0000-4000-8000-000000000055', '30000000-0000-4000-8000-000000000012', 'meticulous', 'sangat teliti/cermat', 'muh-TIK-yuh-luhs', 'She is meticulous about checking every detail.', 'Dia sangat teliti dalam memeriksa setiap detail.', 'adjective', 1),
  ('40000000-0000-4000-8000-000000000056', '30000000-0000-4000-8000-000000000012', 'paradigm', 'paradigma/kerangka berpikir', 'PAR-uh-dime', 'The internet caused a paradigm shift in communication.', 'Internet menyebabkan perubahan paradigma dalam komunikasi.', 'noun', 2),
  ('40000000-0000-4000-8000-000000000057', '30000000-0000-4000-8000-000000000012', 'ambiguous', 'ambigu/tidak jelas', 'am-BIG-yoo-uhs', 'The instructions were ambiguous and confusing.', 'Instruksi tersebut ambigu dan membingungkan.', 'adjective', 3),
  ('40000000-0000-4000-8000-000000000058', '30000000-0000-4000-8000-000000000012', 'resilient', 'tangguh/tahan banting', 'ri-ZIL-yuhnt', 'Despite many setbacks, she remained resilient.', 'Meskipun banyak rintangan, dia tetap tangguh.', 'adjective', 4);

insert into public.lesson_examples (id, lesson_id, english_text, indonesian_text, explanation, order_index) values
  ('50000000-0000-4000-8000-000000000027', '30000000-0000-4000-8000-000000000012', 'The company''s success is due to its meticulous planning.', 'Kesuksesan perusahaan itu disebabkan oleh perencanaannya yang sangat teliti.', 'Contoh penggunaan ''meticulous'' dalam konteks profesional.', 0),
  ('50000000-0000-4000-8000-000000000028', '30000000-0000-4000-8000-000000000012', 'This discovery represents a genuine paradigm shift in the field.', 'Penemuan ini merepresentasikan perubahan paradigma sejati dalam bidang tersebut.', 'Contoh penggunaan frasa ''paradigm shift'' dalam konteks akademik.', 1);

insert into public.questions (id, lesson_id, type, prompt, instruction, correct_answer, explanation, audio_text, difficulty, order_index, points, is_placement_question) values
  ('60000000-0000-4000-8000-000000000062', '30000000-0000-4000-8000-000000000012', 'multiple_choice', 'Choose the word that means ''found everywhere''.', 'Pilih kata yang berarti ''ada di mana-mana''.', 'ubiquitous', '''Ubiquitous'' berarti sesuatu yang ditemukan di mana-mana atau sangat umum.', null, 'beginner', 0, 1, false);
insert into public.question_options (id, question_id, option_text, is_correct, order_index) values
  ('70000000-0000-4000-8000-000000000085', '60000000-0000-4000-8000-000000000062', 'ubiquitous', true, 0),
  ('70000000-0000-4000-8000-000000000086', '60000000-0000-4000-8000-000000000062', 'ambiguous', false, 1),
  ('70000000-0000-4000-8000-000000000087', '60000000-0000-4000-8000-000000000062', 'meticulous', false, 2),
  ('70000000-0000-4000-8000-000000000088', '60000000-0000-4000-8000-000000000062', 'resilient', false, 3);

insert into public.questions (id, lesson_id, type, prompt, instruction, correct_answer, explanation, audio_text, difficulty, order_index, points, is_placement_question) values
  ('60000000-0000-4000-8000-000000000063', '30000000-0000-4000-8000-000000000012', 'fill_blank', 'She is very ___ about checking every detail in her reports.', 'Lengkapi kalimat dengan kata yang berarti ''sangat teliti''.', 'meticulous', '''Meticulous'' berarti sangat teliti atau cermat dalam melakukan sesuatu.', null, 'beginner', 1, 1, false);

insert into public.questions (id, lesson_id, type, prompt, instruction, correct_answer, explanation, audio_text, difficulty, order_index, points, is_placement_question) values
  ('60000000-0000-4000-8000-000000000064', '30000000-0000-4000-8000-000000000012', 'true_false', '''Ambiguous'' and ''ambitious'' have the same meaning.', 'Tentukan benar atau salah.', 'False', '''Ambiguous'' berarti tidak jelas/bermakna ganda, sedangkan ''ambitious'' berarti ambisius; keduanya memiliki arti yang berbeda meskipun bentuknya mirip.', null, 'beginner', 2, 1, false);
insert into public.question_options (id, question_id, option_text, is_correct, order_index) values
  ('70000000-0000-4000-8000-000000000089', '60000000-0000-4000-8000-000000000064', 'True', false, 0),
  ('70000000-0000-4000-8000-000000000090', '60000000-0000-4000-8000-000000000064', 'False', true, 1);

insert into public.questions (id, lesson_id, type, prompt, instruction, correct_answer, explanation, audio_text, difficulty, order_index, points, is_placement_question) values
  ('60000000-0000-4000-8000-000000000065', '30000000-0000-4000-8000-000000000012', 'matching', 'Cocokkan kata tingkat lanjut ''paradigm'' dengan artinya.', 'Pasangkan setiap kata dengan artinya yang tepat.', 'paradigm=kerangka berpikir', '''Paradigm'' berarti kerangka berpikir atau model dasar dalam suatu bidang.', null, 'beginner', 3, 1, false);

insert into public.questions (id, lesson_id, type, prompt, instruction, correct_answer, explanation, audio_text, difficulty, order_index, points, is_placement_question) values
  ('60000000-0000-4000-8000-000000000066', '30000000-0000-4000-8000-000000000012', 'translation', 'Terjemahkan ke Bahasa Inggris: ''Instruksi tersebut sangat ambigu.''', 'Terjemahkan kalimat berikut ke Bahasa Inggris.', 'The instructions were very ambiguous', '''Ambigu'' diterjemahkan menjadi ''ambiguous'', kata sifat yang menggambarkan sesuatu yang tidak jelas maknanya.', null, 'beginner', 4, 1, false);

-- ----- Lesson: Complex Sentence Structures (Struktur Kalimat Kompleks) -----
insert into public.lessons (id, unit_id, title, slug, description, learning_objectives, explanation, grammar_notes, common_mistakes, estimated_minutes, xp_reward, order_index, force_unlocked, is_published) values
  ('30000000-0000-4000-8000-000000000013', '20000000-0000-4000-8000-000000000028', 'Complex Sentence Structures', 'complex-sentence-structures', 'Pelajari cara menyusun kalimat kompleks dengan klausa dependen untuk komunikasi yang lebih matang.', array['Membedakan klausa independen dan dependen','Menggunakan kata sambung subordinatif untuk membentuk kalimat kompleks','Menyusun kalimat dengan klausa relatif (relative clause)','Menggunakan kalimat kompleks untuk menulis dan berbicara yang lebih matang']::text[], 'Kalimat kompleks terdiri dari satu klausa independen (independent clause) yang dapat berdiri sendiri sebagai kalimat lengkap, dan satu atau lebih klausa dependen (dependent clause) yang tidak dapat berdiri sendiri. Klausa dependen biasanya diawali dengan kata sambung subordinatif seperti ''although'', ''because'', ''since'', ''while'', atau ''even though'', misalnya ''Although it was raining, we went for a walk'' (meskipun hujan, kami tetap berjalan-jalan).

Selain klausa subordinatif, kalimat kompleks juga sering menggunakan klausa relatif (relative clause) yang diawali dengan ''who'', ''which'', ''that'', atau ''whose'' untuk memberikan informasi tambahan tentang kata benda, misalnya ''The book that I borrowed from the library was fascinating'' (buku yang saya pinjam dari perpustakaan sangat menarik).

Menggunakan kalimat kompleks secara efektif menunjukkan tingkat kemahiran berbahasa yang lebih tinggi, karena memungkinkan Anda menyampaikan hubungan sebab-akibat, kontras, atau informasi tambahan dalam satu kalimat yang kohesif, dibandingkan menggunakan beberapa kalimat pendek yang terpisah.', 'Ketika klausa dependen diletakkan di awal kalimat, gunakan tanda koma sebelum klausa independen, seperti ''Because she studied hard, she passed the exam.'' Namun jika klausa dependen diletakkan setelah klausa independen, tanda koma umumnya tidak diperlukan, seperti ''She passed the exam because she studied hard.''', 'Kesalahan umum termasuk menulis klausa dependen sebagai kalimat lengkap yang berdiri sendiri (sentence fragment), misalnya ''Although it was raining.'' tanpa klausa independen yang menyertainya. Kesalahan lain adalah salah menggunakan tanda koma, seperti tidak menambahkan koma ketika klausa dependen diletakkan di awal kalimat.', 20, 20, 2, false, true);

insert into public.vocabulary (id, lesson_id, english_word, indonesian_meaning, phonetic, example_sentence, example_translation, word_type, order_index) values
  ('40000000-0000-4000-8000-000000000059', '30000000-0000-4000-8000-000000000013', 'although', 'meskipun', 'ol-THOH', 'Although it was raining, we went for a walk.', 'Meskipun hujan, kami tetap berjalan-jalan.', 'conjunction', 0),
  ('40000000-0000-4000-8000-000000000060', '30000000-0000-4000-8000-000000000013', 'since', 'sejak/karena', 'sins', 'Since she was tired, she went to bed early.', 'Karena dia lelah, dia pergi tidur lebih awal.', 'conjunction', 1),
  ('40000000-0000-4000-8000-000000000061', '30000000-0000-4000-8000-000000000013', 'relative clause', 'klausa relatif', 'REL-uh-tiv klawz', 'The man who lives next door is a doctor.', 'Pria yang tinggal di sebelah adalah seorang dokter.', 'noun', 2),
  ('40000000-0000-4000-8000-000000000062', '30000000-0000-4000-8000-000000000013', 'independent clause', 'klausa independen', 'in-di-PEN-dent klawz', 'An independent clause can stand alone as a sentence.', 'Klausa independen dapat berdiri sendiri sebagai kalimat.', 'noun', 3);

insert into public.lesson_examples (id, lesson_id, english_text, indonesian_text, explanation, order_index) values
  ('50000000-0000-4000-8000-000000000029', '30000000-0000-4000-8000-000000000013', 'Although it was raining, we went for a walk.', 'Meskipun hujan, kami tetap berjalan-jalan.', 'Contoh kalimat kompleks dengan klausa dependen yang diawali kata sambung ''although''.', 0),
  ('50000000-0000-4000-8000-000000000030', '30000000-0000-4000-8000-000000000013', 'The book that I borrowed from the library was fascinating.', 'Buku yang saya pinjam dari perpustakaan sangat menarik.', 'Contoh kalimat kompleks dengan klausa relatif yang diawali ''that''.', 1);

insert into public.questions (id, lesson_id, type, prompt, instruction, correct_answer, explanation, audio_text, difficulty, order_index, points, is_placement_question) values
  ('60000000-0000-4000-8000-000000000067', '30000000-0000-4000-8000-000000000013', 'multiple_choice', 'Choose the correct complex sentence.', 'Pilih kalimat kompleks yang benar secara tata bahasa.', 'Although it was raining, we went for a walk.', 'Kalimat yang benar menempatkan koma setelah klausa dependen yang diletakkan di awal kalimat.', null, 'beginner', 0, 1, false);
insert into public.question_options (id, question_id, option_text, is_correct, order_index) values
  ('70000000-0000-4000-8000-000000000091', '60000000-0000-4000-8000-000000000067', 'Although it was raining, we went for a walk.', true, 0),
  ('70000000-0000-4000-8000-000000000092', '60000000-0000-4000-8000-000000000067', 'Although it was raining. We went for a walk.', false, 1),
  ('70000000-0000-4000-8000-000000000093', '60000000-0000-4000-8000-000000000067', 'It was raining, although we went for a walk we.', false, 2),
  ('70000000-0000-4000-8000-000000000094', '60000000-0000-4000-8000-000000000067', 'Although was it raining, we went for a walk.', false, 3);

insert into public.questions (id, lesson_id, type, prompt, instruction, correct_answer, explanation, audio_text, difficulty, order_index, points, is_placement_question) values
  ('60000000-0000-4000-8000-000000000068', '30000000-0000-4000-8000-000000000013', 'fill_blank', 'The man ___ lives next door is a doctor.', 'Lengkapi kalimat dengan kata sambung relatif yang tepat.', 'who', '''Who'' digunakan sebagai kata sambung relatif untuk merujuk pada orang.', null, 'beginner', 1, 1, false);

insert into public.questions (id, lesson_id, type, prompt, instruction, correct_answer, explanation, audio_text, difficulty, order_index, points, is_placement_question) values
  ('60000000-0000-4000-8000-000000000069', '30000000-0000-4000-8000-000000000013', 'true_false', 'A dependent clause can stand alone as a complete sentence.', 'Tentukan benar atau salah.', 'False', 'Klausa dependen tidak dapat berdiri sendiri sebagai kalimat lengkap; klausa ini harus disertai klausa independen.', null, 'beginner', 2, 1, false);
insert into public.question_options (id, question_id, option_text, is_correct, order_index) values
  ('70000000-0000-4000-8000-000000000095', '60000000-0000-4000-8000-000000000069', 'True', false, 0),
  ('70000000-0000-4000-8000-000000000096', '60000000-0000-4000-8000-000000000069', 'False', true, 1);

insert into public.questions (id, lesson_id, type, prompt, instruction, correct_answer, explanation, audio_text, difficulty, order_index, points, is_placement_question) values
  ('60000000-0000-4000-8000-000000000070', '30000000-0000-4000-8000-000000000013', 'sentence_arrangement', 'hard / because / passed / she / studied / she / the / exam', 'Susun kata-kata menjadi kalimat kompleks yang benar.', 'she passed the exam because she studied hard', 'Klausa independen ''she passed the exam'' diikuti klausa dependen ''because she studied hard'' tanpa memerlukan koma karena klausa dependen berada di akhir kalimat.', null, 'beginner', 3, 1, false);

insert into public.questions (id, lesson_id, type, prompt, instruction, correct_answer, explanation, audio_text, difficulty, order_index, points, is_placement_question) values
  ('60000000-0000-4000-8000-000000000071', '30000000-0000-4000-8000-000000000013', 'translation', 'Terjemahkan ke Bahasa Inggris: ''Buku yang saya pinjam dari perpustakaan sangat menarik.''', 'Terjemahkan kalimat berikut ke Bahasa Inggris.', 'The book that I borrowed from the library was fascinating', 'Klausa relatif ''that I borrowed from the library'' memberikan informasi tambahan tentang ''the book''.', null, 'beginner', 4, 1, false);

-- ===== PLACEMENT TEST QUESTIONS =====
insert into public.questions (id, lesson_id, type, prompt, instruction, correct_answer, explanation, audio_text, difficulty, order_index, points, is_placement_question) values
  ('90000000-0000-4000-8000-000000000001', null, 'multiple_choice', 'I ___ a student.', 'Pilih jawaban yang paling tepat untuk melengkapi kalimat.', 'am', 'Subjek ''I'' selalu berpasangan dengan kata kerja to be ''am''.', null, 'beginner', 0, 1, true);
insert into public.question_options (id, question_id, option_text, is_correct, order_index) values
  ('a0000000-0000-4000-8000-000000000001', '90000000-0000-4000-8000-000000000001', 'am', true, 0),
  ('a0000000-0000-4000-8000-000000000002', '90000000-0000-4000-8000-000000000001', 'is', false, 1),
  ('a0000000-0000-4000-8000-000000000003', '90000000-0000-4000-8000-000000000001', 'are', false, 2),
  ('a0000000-0000-4000-8000-000000000004', '90000000-0000-4000-8000-000000000001', 'be', false, 3);

insert into public.questions (id, lesson_id, type, prompt, instruction, correct_answer, explanation, audio_text, difficulty, order_index, points, is_placement_question) values
  ('90000000-0000-4000-8000-000000000002', null, 'multiple_choice', 'She ___ from Indonesia.', 'Pilih jawaban yang paling tepat untuk melengkapi kalimat.', 'is', 'Subjek ''she'' adalah tunggal, sehingga menggunakan kata kerja to be ''is''.', null, 'beginner', 1, 1, true);
insert into public.question_options (id, question_id, option_text, is_correct, order_index) values
  ('a0000000-0000-4000-8000-000000000005', '90000000-0000-4000-8000-000000000002', 'is', true, 0),
  ('a0000000-0000-4000-8000-000000000006', '90000000-0000-4000-8000-000000000002', 'am', false, 1),
  ('a0000000-0000-4000-8000-000000000007', '90000000-0000-4000-8000-000000000002', 'are', false, 2),
  ('a0000000-0000-4000-8000-000000000008', '90000000-0000-4000-8000-000000000002', 'be', false, 3);

insert into public.questions (id, lesson_id, type, prompt, instruction, correct_answer, explanation, audio_text, difficulty, order_index, points, is_placement_question) values
  ('90000000-0000-4000-8000-000000000003', null, 'multiple_choice', 'They ___ happy.', 'Pilih jawaban yang paling tepat untuk melengkapi kalimat.', 'are', 'Subjek ''they'' adalah jamak, sehingga menggunakan kata kerja to be ''are''.', null, 'beginner', 2, 1, true);
insert into public.question_options (id, question_id, option_text, is_correct, order_index) values
  ('a0000000-0000-4000-8000-000000000009', '90000000-0000-4000-8000-000000000003', 'are', true, 0),
  ('a0000000-0000-4000-8000-000000000010', '90000000-0000-4000-8000-000000000003', 'is', false, 1),
  ('a0000000-0000-4000-8000-000000000011', '90000000-0000-4000-8000-000000000003', 'am', false, 2),
  ('a0000000-0000-4000-8000-000000000012', '90000000-0000-4000-8000-000000000003', 'be', false, 3);

insert into public.questions (id, lesson_id, type, prompt, instruction, correct_answer, explanation, audio_text, difficulty, order_index, points, is_placement_question) values
  ('90000000-0000-4000-8000-000000000004', null, 'multiple_choice', 'This ___ my book.', 'Pilih jawaban yang paling tepat untuk melengkapi kalimat.', 'is', 'Subjek ''this'' adalah tunggal, sehingga menggunakan kata kerja to be ''is''.', null, 'beginner', 3, 1, true);
insert into public.question_options (id, question_id, option_text, is_correct, order_index) values
  ('a0000000-0000-4000-8000-000000000013', '90000000-0000-4000-8000-000000000004', 'is', true, 0),
  ('a0000000-0000-4000-8000-000000000014', '90000000-0000-4000-8000-000000000004', 'am', false, 1),
  ('a0000000-0000-4000-8000-000000000015', '90000000-0000-4000-8000-000000000004', 'are', false, 2),
  ('a0000000-0000-4000-8000-000000000016', '90000000-0000-4000-8000-000000000004', 'be', false, 3);

insert into public.questions (id, lesson_id, type, prompt, instruction, correct_answer, explanation, audio_text, difficulty, order_index, points, is_placement_question) values
  ('90000000-0000-4000-8000-000000000005', null, 'multiple_choice', 'He ___ to school every day.', 'Pilih jawaban yang paling tepat untuk melengkapi kalimat.', 'goes', 'Subjek tunggal orang ketiga ''he'' memerlukan kata kerja dengan akhiran -es, yaitu ''goes''.', null, 'elementary', 4, 1, true);
insert into public.question_options (id, question_id, option_text, is_correct, order_index) values
  ('a0000000-0000-4000-8000-000000000017', '90000000-0000-4000-8000-000000000005', 'goes', true, 0),
  ('a0000000-0000-4000-8000-000000000018', '90000000-0000-4000-8000-000000000005', 'go', false, 1),
  ('a0000000-0000-4000-8000-000000000019', '90000000-0000-4000-8000-000000000005', 'going', false, 2),
  ('a0000000-0000-4000-8000-000000000020', '90000000-0000-4000-8000-000000000005', 'gone', false, 3);

insert into public.questions (id, lesson_id, type, prompt, instruction, correct_answer, explanation, audio_text, difficulty, order_index, points, is_placement_question) values
  ('90000000-0000-4000-8000-000000000006', null, 'multiple_choice', 'Choose the correct negative sentence.', 'Pilih kalimat negatif yang benar secara tata bahasa.', 'I don''t like coffee.', 'Bentuk negatif simple present untuk subjek ''I'' menggunakan ''don''t'' diikuti kata kerja dasar.', null, 'elementary', 5, 1, true);
insert into public.question_options (id, question_id, option_text, is_correct, order_index) values
  ('a0000000-0000-4000-8000-000000000021', '90000000-0000-4000-8000-000000000006', 'I don''t like coffee.', true, 0),
  ('a0000000-0000-4000-8000-000000000022', '90000000-0000-4000-8000-000000000006', 'I not like coffee.', false, 1),
  ('a0000000-0000-4000-8000-000000000023', '90000000-0000-4000-8000-000000000006', 'I doesn''t like coffee.', false, 2),
  ('a0000000-0000-4000-8000-000000000024', '90000000-0000-4000-8000-000000000006', 'I no like coffee.', false, 3);

insert into public.questions (id, lesson_id, type, prompt, instruction, correct_answer, explanation, audio_text, difficulty, order_index, points, is_placement_question) values
  ('90000000-0000-4000-8000-000000000007', null, 'multiple_choice', 'Yesterday, I ___ to the market.', 'Pilih jawaban yang paling tepat untuk melengkapi kalimat.', 'went', '''Went'' adalah bentuk simple past tidak beraturan dari ''go'', digunakan untuk kejadian di masa lalu.', null, 'elementary', 6, 1, true);
insert into public.question_options (id, question_id, option_text, is_correct, order_index) values
  ('a0000000-0000-4000-8000-000000000025', '90000000-0000-4000-8000-000000000007', 'went', true, 0),
  ('a0000000-0000-4000-8000-000000000026', '90000000-0000-4000-8000-000000000007', 'go', false, 1),
  ('a0000000-0000-4000-8000-000000000027', '90000000-0000-4000-8000-000000000007', 'goes', false, 2),
  ('a0000000-0000-4000-8000-000000000028', '90000000-0000-4000-8000-000000000007', 'going', false, 3);

insert into public.questions (id, lesson_id, type, prompt, instruction, correct_answer, explanation, audio_text, difficulty, order_index, points, is_placement_question) values
  ('90000000-0000-4000-8000-000000000008', null, 'multiple_choice', 'There ___ many books on the table.', 'Pilih jawaban yang paling tepat untuk melengkapi kalimat.', 'are', 'Subjek ''many books'' adalah jamak, sehingga menggunakan ''are''.', null, 'elementary', 7, 1, true);
insert into public.question_options (id, question_id, option_text, is_correct, order_index) values
  ('a0000000-0000-4000-8000-000000000029', '90000000-0000-4000-8000-000000000008', 'are', true, 0),
  ('a0000000-0000-4000-8000-000000000030', '90000000-0000-4000-8000-000000000008', 'is', false, 1),
  ('a0000000-0000-4000-8000-000000000031', '90000000-0000-4000-8000-000000000008', 'be', false, 2),
  ('a0000000-0000-4000-8000-000000000032', '90000000-0000-4000-8000-000000000008', 'was', false, 3);

insert into public.questions (id, lesson_id, type, prompt, instruction, correct_answer, explanation, audio_text, difficulty, order_index, points, is_placement_question) values
  ('90000000-0000-4000-8000-000000000009', null, 'multiple_choice', 'I ___ never been to Paris.', 'Pilih jawaban yang paling tepat untuk melengkapi kalimat.', 'have', 'Subjek ''I'' menggunakan ''have'' dalam present perfect tense.', null, 'intermediate', 8, 1, true);
insert into public.question_options (id, question_id, option_text, is_correct, order_index) values
  ('a0000000-0000-4000-8000-000000000033', '90000000-0000-4000-8000-000000000009', 'have', true, 0),
  ('a0000000-0000-4000-8000-000000000034', '90000000-0000-4000-8000-000000000009', 'has', false, 1),
  ('a0000000-0000-4000-8000-000000000035', '90000000-0000-4000-8000-000000000009', 'had', false, 2),
  ('a0000000-0000-4000-8000-000000000036', '90000000-0000-4000-8000-000000000009', 'having', false, 3);

insert into public.questions (id, lesson_id, type, prompt, instruction, correct_answer, explanation, audio_text, difficulty, order_index, points, is_placement_question) values
  ('90000000-0000-4000-8000-000000000010', null, 'multiple_choice', 'If it rains tomorrow, I ___ stay home.', 'Pilih jawaban yang paling tepat untuk melengkapi kalimat.', 'will', 'First conditional menggunakan ''will'' pada klausa utama untuk kemungkinan nyata di masa depan.', null, 'intermediate', 9, 1, true);
insert into public.question_options (id, question_id, option_text, is_correct, order_index) values
  ('a0000000-0000-4000-8000-000000000037', '90000000-0000-4000-8000-000000000010', 'will', true, 0),
  ('a0000000-0000-4000-8000-000000000038', '90000000-0000-4000-8000-000000000010', 'would', false, 1),
  ('a0000000-0000-4000-8000-000000000039', '90000000-0000-4000-8000-000000000010', 'am', false, 2),
  ('a0000000-0000-4000-8000-000000000040', '90000000-0000-4000-8000-000000000010', 'was', false, 3);

insert into public.questions (id, lesson_id, type, prompt, instruction, correct_answer, explanation, audio_text, difficulty, order_index, points, is_placement_question) values
  ('90000000-0000-4000-8000-000000000011', null, 'multiple_choice', 'She has ___ finished her homework, so she can go out now.', 'Pilih jawaban yang paling tepat untuk melengkapi kalimat.', 'already', '''Already'' digunakan untuk menyatakan sesuatu sudah terjadi lebih cepat dari yang diharapkan.', null, 'intermediate', 10, 1, true);
insert into public.question_options (id, question_id, option_text, is_correct, order_index) values
  ('a0000000-0000-4000-8000-000000000041', '90000000-0000-4000-8000-000000000011', 'already', true, 0),
  ('a0000000-0000-4000-8000-000000000042', '90000000-0000-4000-8000-000000000011', 'yet', false, 1),
  ('a0000000-0000-4000-8000-000000000043', '90000000-0000-4000-8000-000000000011', 'ever', false, 2),
  ('a0000000-0000-4000-8000-000000000044', '90000000-0000-4000-8000-000000000011', 'still', false, 3);

insert into public.questions (id, lesson_id, type, prompt, instruction, correct_answer, explanation, audio_text, difficulty, order_index, points, is_placement_question) values
  ('90000000-0000-4000-8000-000000000012', null, 'multiple_choice', 'By the time we arrived, the movie ___ already started.', 'Pilih jawaban yang paling tepat untuk melengkapi kalimat.', 'had', 'Past perfect (had + past participle) digunakan untuk kejadian yang terjadi sebelum kejadian lain di masa lalu.', null, 'intermediate', 11, 1, true);
insert into public.question_options (id, question_id, option_text, is_correct, order_index) values
  ('a0000000-0000-4000-8000-000000000045', '90000000-0000-4000-8000-000000000012', 'had', true, 0),
  ('a0000000-0000-4000-8000-000000000046', '90000000-0000-4000-8000-000000000012', 'has', false, 1),
  ('a0000000-0000-4000-8000-000000000047', '90000000-0000-4000-8000-000000000012', 'have', false, 2),
  ('a0000000-0000-4000-8000-000000000048', '90000000-0000-4000-8000-000000000012', 'was', false, 3);

insert into public.questions (id, lesson_id, type, prompt, instruction, correct_answer, explanation, audio_text, difficulty, order_index, points, is_placement_question) values
  ('90000000-0000-4000-8000-000000000013', null, 'multiple_choice', 'If I ___ more time, I would learn French.', 'Pilih jawaban yang paling tepat untuk melengkapi kalimat.', 'had', 'Second conditional menggunakan simple past (''had'') pada klausa ''if'' untuk situasi hipotetis.', null, 'upper_intermediate', 12, 1, true);
insert into public.question_options (id, question_id, option_text, is_correct, order_index) values
  ('a0000000-0000-4000-8000-000000000049', '90000000-0000-4000-8000-000000000013', 'had', true, 0),
  ('a0000000-0000-4000-8000-000000000050', '90000000-0000-4000-8000-000000000013', 'have', false, 1),
  ('a0000000-0000-4000-8000-000000000051', '90000000-0000-4000-8000-000000000013', 'has', false, 2),
  ('a0000000-0000-4000-8000-000000000052', '90000000-0000-4000-8000-000000000013', 'would have', false, 3);

insert into public.questions (id, lesson_id, type, prompt, instruction, correct_answer, explanation, audio_text, difficulty, order_index, points, is_placement_question) values
  ('90000000-0000-4000-8000-000000000014', null, 'multiple_choice', 'The report ___ by the manager yesterday.', 'Pilih jawaban yang paling tepat untuk melengkapi kalimat pasif.', 'was reviewed', 'Kalimat pasif simple past menggunakan struktur was/were + past participle, yaitu ''was reviewed''.', null, 'upper_intermediate', 13, 1, true);
insert into public.question_options (id, question_id, option_text, is_correct, order_index) values
  ('a0000000-0000-4000-8000-000000000053', '90000000-0000-4000-8000-000000000014', 'was reviewed', true, 0),
  ('a0000000-0000-4000-8000-000000000054', '90000000-0000-4000-8000-000000000014', 'reviewed', false, 1),
  ('a0000000-0000-4000-8000-000000000055', '90000000-0000-4000-8000-000000000014', 'is reviewed', false, 2),
  ('a0000000-0000-4000-8000-000000000056', '90000000-0000-4000-8000-000000000014', 'has review', false, 3);

insert into public.questions (id, lesson_id, type, prompt, instruction, correct_answer, explanation, audio_text, difficulty, order_index, points, is_placement_question) values
  ('90000000-0000-4000-8000-000000000015', null, 'multiple_choice', 'She said that she ___ tired.', 'Pilih jawaban yang paling tepat untuk melengkapi kalimat reported speech.', 'was', 'Dalam reported speech, kata kerja to be ''is'' berubah menjadi ''was'' saat kalimat langsung diubah menjadi kalimat tidak langsung.', null, 'upper_intermediate', 14, 1, true);
insert into public.question_options (id, question_id, option_text, is_correct, order_index) values
  ('a0000000-0000-4000-8000-000000000057', '90000000-0000-4000-8000-000000000015', 'was', true, 0),
  ('a0000000-0000-4000-8000-000000000058', '90000000-0000-4000-8000-000000000015', 'is', false, 1),
  ('a0000000-0000-4000-8000-000000000059', '90000000-0000-4000-8000-000000000015', 'has been', false, 2),
  ('a0000000-0000-4000-8000-000000000060', '90000000-0000-4000-8000-000000000015', 'be', false, 3);

insert into public.questions (id, lesson_id, type, prompt, instruction, correct_answer, explanation, audio_text, difficulty, order_index, points, is_placement_question) values
  ('90000000-0000-4000-8000-000000000016', null, 'multiple_choice', 'Choose the correct sentence using a relative clause.', 'Pilih kalimat dengan klausa relatif yang benar.', 'The man who lives next door is a doctor.', '''Who'' digunakan sebagai kata sambung relatif untuk merujuk pada orang, diikuti klausa yang memberi informasi tambahan.', null, 'upper_intermediate', 15, 1, true);
insert into public.question_options (id, question_id, option_text, is_correct, order_index) values
  ('a0000000-0000-4000-8000-000000000061', '90000000-0000-4000-8000-000000000016', 'The man who lives next door is a doctor.', true, 0),
  ('a0000000-0000-4000-8000-000000000062', '90000000-0000-4000-8000-000000000016', 'The man which lives next door is a doctor.', false, 1),
  ('a0000000-0000-4000-8000-000000000063', '90000000-0000-4000-8000-000000000016', 'The man lives next door who is a doctor.', false, 2),
  ('a0000000-0000-4000-8000-000000000064', '90000000-0000-4000-8000-000000000016', 'The man, lives next door, is a doctor.', false, 3);

insert into public.questions (id, lesson_id, type, prompt, instruction, correct_answer, explanation, audio_text, difficulty, order_index, points, is_placement_question) values
  ('90000000-0000-4000-8000-000000000017', null, 'multiple_choice', 'Choose the word closest in meaning to ''ubiquitous''.', 'Pilih kata yang paling mendekati arti ''ubiquitous''.', 'widespread', '''Ubiquitous'' berarti ditemukan di mana-mana, sehingga paling dekat maknanya dengan ''widespread'' (tersebar luas).', null, 'advanced', 16, 1, true);
insert into public.question_options (id, question_id, option_text, is_correct, order_index) values
  ('a0000000-0000-4000-8000-000000000065', '90000000-0000-4000-8000-000000000017', 'widespread', true, 0),
  ('a0000000-0000-4000-8000-000000000066', '90000000-0000-4000-8000-000000000017', 'rare', false, 1),
  ('a0000000-0000-4000-8000-000000000067', '90000000-0000-4000-8000-000000000017', 'ambiguous', false, 2),
  ('a0000000-0000-4000-8000-000000000068', '90000000-0000-4000-8000-000000000017', 'meticulous', false, 3);

insert into public.questions (id, lesson_id, type, prompt, instruction, correct_answer, explanation, audio_text, difficulty, order_index, points, is_placement_question) values
  ('90000000-0000-4000-8000-000000000018', null, 'multiple_choice', 'Choose the idiom that means ''to reveal a secret accidentally''.', 'Pilih idiom yang berarti ''membocorkan rahasia secara tidak sengaja''.', 'let the cat out of the bag', '''Let the cat out of the bag'' adalah idiom yang berarti membocorkan rahasia secara tidak sengaja.', null, 'advanced', 17, 1, true);
insert into public.question_options (id, question_id, option_text, is_correct, order_index) values
  ('a0000000-0000-4000-8000-000000000069', '90000000-0000-4000-8000-000000000018', 'let the cat out of the bag', true, 0),
  ('a0000000-0000-4000-8000-000000000070', '90000000-0000-4000-8000-000000000018', 'hit the nail on the head', false, 1),
  ('a0000000-0000-4000-8000-000000000071', '90000000-0000-4000-8000-000000000018', 'beat around the bush', false, 2),
  ('a0000000-0000-4000-8000-000000000072', '90000000-0000-4000-8000-000000000018', 'cost an arm and a leg', false, 3);

insert into public.questions (id, lesson_id, type, prompt, instruction, correct_answer, explanation, audio_text, difficulty, order_index, points, is_placement_question) values
  ('90000000-0000-4000-8000-000000000019', null, 'multiple_choice', 'Choose the correct sentence.', 'Pilih kalimat yang benar secara tata bahasa menggunakan inversi.', 'Not only was she talented, but she was also hardworking.', 'Setelah frasa negatif ''Not only'' di awal kalimat, terjadi inversi subjek-verba, sehingga menjadi ''Not only was she talented...''.', null, 'advanced', 18, 1, true);
insert into public.question_options (id, question_id, option_text, is_correct, order_index) values
  ('a0000000-0000-4000-8000-000000000073', '90000000-0000-4000-8000-000000000019', 'Not only was she talented, but she was also hardworking.', true, 0),
  ('a0000000-0000-4000-8000-000000000074', '90000000-0000-4000-8000-000000000019', 'Not only she was talented, but also she was hardworking.', false, 1),
  ('a0000000-0000-4000-8000-000000000075', '90000000-0000-4000-8000-000000000019', 'Not only was she talented, but also was hardworking.', false, 2),
  ('a0000000-0000-4000-8000-000000000076', '90000000-0000-4000-8000-000000000019', 'She was not only talented, but hardworking also was.', false, 3);

insert into public.questions (id, lesson_id, type, prompt, instruction, correct_answer, explanation, audio_text, difficulty, order_index, points, is_placement_question) values
  ('90000000-0000-4000-8000-000000000020', null, 'multiple_choice', 'Choose the sentence with correct subjunctive mood.', 'Pilih kalimat dengan mood subjungtif yang benar.', 'I wish I were taller.', 'Dalam subjunctive mood setelah ''wish'', kata kerja to be menggunakan ''were'' untuk semua subjek, termasuk ''I''.', null, 'advanced', 19, 1, true);
insert into public.question_options (id, question_id, option_text, is_correct, order_index) values
  ('a0000000-0000-4000-8000-000000000077', '90000000-0000-4000-8000-000000000020', 'I wish I were taller.', true, 0),
  ('a0000000-0000-4000-8000-000000000078', '90000000-0000-4000-8000-000000000020', 'I wish I was taller so much.', false, 1),
  ('a0000000-0000-4000-8000-000000000079', '90000000-0000-4000-8000-000000000020', 'I wish I am taller.', false, 2),
  ('a0000000-0000-4000-8000-000000000080', '90000000-0000-4000-8000-000000000020', 'I wish I will be taller.', false, 3);

-- ===== ACHIEVEMENTS =====
insert into public.achievements (id, name, slug, description, icon, xp_reward, requirement_type, requirement_value) values
  ('80000000-0000-4000-8000-000000000001', 'First Step', 'first-step', 'Selesaikan pelajaran pertamamu untuk membuka pencapaian ini.', 'footprints', 10, 'lessons_completed', 1),
  ('80000000-0000-4000-8000-000000000002', 'Perfect Score', 'perfect-score', 'Dapatkan nilai sempurna pada sebuah kuis.', 'star', 20, 'quiz_perfect', 1),
  ('80000000-0000-4000-8000-000000000003', 'Three-Day Streak', 'three-day-streak', 'Belajar selama tiga hari berturut-turut tanpa henti.', 'flame', 15, 'streak_days', 3),
  ('80000000-0000-4000-8000-000000000004', 'Vocabulary Starter', 'vocabulary-starter', 'Pelajari 50 kata kosakata baru.', 'book-open', 25, 'vocabulary_completed', 50),
  ('80000000-0000-4000-8000-000000000005', 'Speaking Starter', 'speaking-starter', 'Selesaikan latihan berbicara pertamamu.', 'mic', 15, 'speaking_attempts', 1),
  ('80000000-0000-4000-8000-000000000006', 'Dedicated Learner', 'dedicated-learner', 'Selesaikan 20 pelajaran untuk menunjukkan dedikasimu dalam belajar.', 'graduation-cap', 50, 'lessons_completed', 20);
