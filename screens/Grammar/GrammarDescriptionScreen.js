import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { BOXSHADOW, COLORS, FONTS, SIZES } from '../../app/constants/themes'
import { WebView } from 'react-native-webview';
import GrammarAPI from '../../app/API/GrammarAPI';

const GrammarDescriptionScreen = (props) => {


    const html = `<div class="post_content">
    <p style="text-align: justify;"><strong><span style="font-size: 11pt;">Bài học hôm nay, chúng ta sẽ cùng tìm hiểu về Thì Hiện tại đơn&nbsp;(Present Simple) và riêng ứng dụng của nó trong bài thi IELTS của mình. </span></strong></p>
<p style="text-align: justify;"><strong><span style="font-size: 11pt;">Đây là dạng thì đơn giản nhất nhưng là nền tảng để các bạn học các thì khác. Vì thế, các bạn cần chú ý thực hành đầy đủ để ghi nhớ bài học nữa nhé!</span></strong></p>
<p style="text-align: left;"><strong style="color: #ff0000; font-size: 12pt; text-align: justify;">I. CÔNG THỨC THÌ HIỆN TẠI ĐƠN</strong></p>
<h3 style="text-align: justify;"><strong><span style="font-size: 11pt;">1. Câu khẳng định</span></strong></h3>
<table style="border-collapse: collapse;" border="-">
<tbody>
<tr>
<td><span style="font-size: 11pt;">ST</span></td>
<td style="text-align: center;"><span style="font-size: 11pt;">Động từ tobe</span></td>
<td style="text-align: center;"><span style="font-size: 11pt;">Động từ thường</span></td>
</tr>
<tr>
<td><span style="font-size: 11pt;">Công thức</span></td>
<td>
<p style="padding-left: 30px;"><span style="font-size: 11pt;">S + am/ is/ are+ N/ Adj</span></p>
<p style="padding-left: 30px;"><span style="font-size: 11pt;">- I + am</span></p>
<p style="padding-left: 30px;"><span style="font-size: 11pt;">- He/ She/ It/ Danh từ số ít/ Danh từ không đếm được + is</span></p>
<p style="padding-left: 30px;"><span style="font-size: 11pt;">- You/ We/ They/ Danh từ số nhiều + are</span></p>
</td>
<td>
<p style="padding-left: 30px;"><span style="font-size: 11pt;">S + V(s/es)</span></p>
<p style="padding-left: 30px;"><span style="font-size: 11pt;">- I/ We/ You/ They/ Danh từ số nhiều + V(nguyên thể)</span></p>
<p style="padding-left: 30px;"><span style="font-size: 11pt;">- He/ She/ It/ Danh từ số ít/ Danh từ không đếm được + V(s/es)</span></p>
</td>
</tr>
<tr>
<td><span style="font-size: 11pt;">Ví dụ</span></td>
<td>
<p style="padding-left: 30px;"><span style="font-size: 11pt;">- He is a lawyer. (Ông ấy là một luật sư)</span></p>
<p style="padding-left: 30px;"><span style="font-size: 11pt;">- The watch is expensive. (Chiếc đồng hồ rất đắt tiền)</span></p>
<p style="padding-left: 30px;"><span style="font-size: 11pt;">- They are students. (Họ là sinh viên)</span></p>
</td>
<td>
<p style="padding-left: 30px;"><span style="font-size: 11pt;">- I often go to school by bus (Tôi thỉnh thoảng đến trường bằng xe buýt)</span></p>
<p style="padding-left: 30px;"><span style="font-size: 11pt;">- He usually gets up early. (Anh ấy thường xuyên dạy sớm)</span></p>
<p style="padding-left: 30px;"><span style="font-size: 11pt;">- She does homework every evening. (Cô ấy làm bài về nhà mỗi tối)</span></p>
<p style="padding-left: 30px;"><span style="font-size: 11pt;">- The Sun sets in the West. (Mặt trời lặn ở hướng Tây)</span></p>
</td>
</tr>
</tbody>
</table>
<p><br><span style="font-size: 11pt;">- Với các từ có tận cùng là “o”, “ch”, “sh”, “x”, “s” thì khi dùng với ngôi số ít, thêm đuôi “es”. (<em>go – goes; do – does; watch – watches; fix – fixes, miss – misses, wash - washes )</em></span></p>
<p style="text-align: justify;"><span style="font-size: 11pt;">- Với các từ có tận cùng là “y” thì khi dùng với ngôi số ít, bỏ “y” và thêm đuôi “ies” (<em>copy – copies; study – studies</em>)</span></p>
<p><span style="font-size: 11pt;">- Với các từ còn lại, thêm đuôi “s”. (<em>see – sees; play – plays,…</em>)</span></p>
<p style="text-align: left;"><span style="font-size: 11pt;">Cùng xem video nhé:</span></p>
<p style="text-align: center;"><iframe src="//www.youtube.com/embed/iDtcl6Qdepg" width="425" height="350"></iframe></p>
<h3 style="text-align: justify;"><span style="font-size: 11pt;"><strong>2. Câu phủ định</strong></span></h3>
<table style="border-collapse: collapse;" border="-" cellspacing="10" cellpadding="10">
<tbody>
<tr>
<td width="103">
<p><span style="font-size: 11pt;">&nbsp;</span></p>
</td>
<td width="294">
<p><span style="font-size: 11pt;">Động từ “to be”</span></p>
</td>
<td width="301">
<p><span style="font-size: 11pt;">Động từ chỉ hành động</span></p>
</td>
</tr>
<tr>
<td width="103">
<p><span style="font-size: 11pt;">Công thức</span></p>
</td>
<td width="294">
<p><span style="font-size: 11pt;">S + am/are/is + not +N/ Adj</span></p>
</td>
<td width="301">
<p><span style="font-size: 11pt;">S + do/ does + not + V(nguyên thể)</span></p>
<p><span style="font-size: 11pt;">(Trong đó: “do”, “does” là các trợ động từ.)</span></p>
</td>
</tr>
<tr>
<td width="103">
<p><span style="font-size: 11pt;">Chú ý </span></p>
<p><span style="font-size: 11pt;">(Viết tắt)</span></p>
</td>
<td width="294">
<p><span style="font-size: 11pt;">is not = isn’t</span></p>
<p><span style="font-size: 11pt;">are not = aren’t</span></p>
</td>
<td width="301">
<p><span style="font-size: 11pt;">do not = don’t</span></p>
<p><span style="font-size: 11pt;">does not = doesn’t</span></p>
</td>
</tr>
<tr>
<td width="103">
<p><span style="font-size: 11pt;">Ví dụ</span></p>
</td>
<td width="294">
<p><span style="font-size: 11pt;"><em>- I am not a teacher. (Tôi không phải là một giáo viên.)</em></span></p>
<p><span style="font-size: 11pt;"><em>- He is not (isn’t) a lawyer. (Ông ấy không phải&nbsp;là một luật sư)</em></span></p>
<p><span style="font-size: 11pt;"><em>- The watch is not (isn’t) expensive. (Chiếc đồng hồ không đắt tiền)</em></span></p>
<p><span style="font-size: 11pt;">-&nbsp;&nbsp; <em>They are not (aren’t) students. </em><em>(Họ không phải&nbsp;là sinh viên)</em></span></p>
<p><span style="font-size: 11pt;"><em>&nbsp;</em></span></p>
</td>
<td width="301">
<p><span style="font-size: 11pt;">-&nbsp;&nbsp;&nbsp;&nbsp; <em>I do not (don’t) often &nbsp;go to school by bus </em><em>(Tôi không thường xuyên đến trường bằng xe buýt)</em></span></p>
<p><span style="font-size: 11pt;">-&nbsp;&nbsp; <em>He does not (doesn’t) usually get up early. </em><em>(Anh ấy không thường xuyên dạy sớm)</em></span></p>
<p><span style="font-size: 11pt;">-&nbsp;&nbsp; <em>She does not (doesn’t) do homework every evening.</em><em> (Cô ấy không làm bài về nhà mỗi tối)</em></span></p>
<p><span style="font-size: 11pt;"><em>- The Sun does not (doesn’t) set in the South. &nbsp;(Mặt trời không lặn ở hướng Nam)</em></span></p>
</td>
</tr>
</tbody>
</table>
<p style="text-align: justify;"><span style="font-size: 11pt;"><br>Đối với Câu phủ định, phần động từ thường, các bạn rất hay mắc phải lỗi <em>thêm “s” hoặc “es” đằng sau động từ</em>. Các bạn chú ý:</span></p>
<p style="text-align: justify;"><span style="font-size: 11pt;">Chủ ngữ + don’t/ doesn’t + V (nguyên thể - không chia)</span></p>
<p style="text-align: justify;"><span style="text-decoration: underline;"><span style="font-size: 11pt;">Ví dụ:</span></span></p>
<p style="text-align: justify;"><span style="font-size: 11pt;">Câu sai: She <span style="text-decoration: line-through;">doesn’t likes</span> chocolate. (Sai vì đã có “doesn’t” mà động từ “like” vẫn có đuôi “s”)</span></p>
<p style="text-align: justify;"><span style="font-size: 11pt;">=&gt; Câu đúng: <em>She doesn’t like chocolate</em>.</span></p>
<h3 style="text-align: justify;"><strong><span style="font-size: 11pt;">3. Câu nghi vấn</span></strong></h3>
<p><strong><span style="font-size: 11pt;">a. Câu nghi vấn sử dụng trợ động từ (Câu hỏi Yes/ No)</span></strong></p>
<table style="border-collapse: collapse;" border="-">
<tbody>
<tr>
<td width="84">
<p><span style="font-size: 11pt;"><u>&nbsp;</u></span></p>
</td>
<td width="275">
<p><span style="font-size: 11pt;">Động từ to “be”</span></p>
</td>
<td colspan="2" width="289">
<p><span style="font-size: 11pt;">Động từ chỉ hành động</span></p>
</td>
</tr>
<tr>
<td width="84">
<p><span style="font-size: 11pt;">Công thức</span></p>
</td>
<td colspan="2" width="275">
<p><span style="font-size: 11pt;">Q:&nbsp;Am/ Are/ Is&nbsp;(not)&nbsp;+ S + N/Adj?</span></p>
<p><span style="font-size: 11pt;">A: - Yes, S + am/ are/ is.</span></p>
<p><span style="font-size: 11pt;">- &nbsp;&nbsp;No, S + am not/ aren’t/ isn’t.</span></p>
</td>
<td width="289">
<p><span style="font-size: 11pt;">Q: Do/ Does (not)&nbsp;+ S +&nbsp;V (nguyên thể)?</span></p>
<p><span style="font-size: 11pt;">A:&nbsp; - Yes, S + do/ does.</span></p>
<p><span style="font-size: 11pt;">-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; No, S + don’t/ doesn’t.</span></p>
</td>
</tr>
<tr>
<td width="84">
<p><span style="font-size: 11pt;">Ví dụ</span></p>
</td>
<td colspan="2" width="275">
<p><span style="font-size: 11pt;"><em>Q: Are&nbsp;you a </em><em>engineer</em><em>?</em><em> (Bạn có phải là </em><em>kỹ&nbsp;sư</em><em> không?</em></span></p>
<p><span style="font-size: 11pt;"><em>A: Yes, <u>I am</u>. (Đúng vậy)</em></span></p>
<p><span style="font-size: 11pt;"><em>&nbsp;&nbsp;&nbsp; No, <u>I am not</u>. </em><em>(Không phải)</em></span></p>
</td>
<td width="289">
<p><span style="font-size: 11pt;"><em>Q: Does </em><em>s</em><em>he go to </em><em>work</em><em> by </em><em>taxi</em><em>? </em><em>(</em><em>Cô</em><em> ấy </em><em>đi làm bằng taxi phải không</em><em>?)</em></span></p>
<p><span style="font-size: 11pt;"><em>A: Yes, </em><em><u>s</u></em><em><u>he does</u></em><em>. </em><em>(Có)</em></span></p>
<p><span style="font-size: 11pt;"><em>&nbsp;&nbsp;&nbsp;&nbsp; No, </em><em><u>s</u></em><em><u>he doesn’t</u></em><em>. </em><em>(Không)</em></span></p>
</td>
</tr>
</tbody>
</table>
<p style="text-align: justify;"><span style="font-size: 11pt;">&nbsp;</span></p>
<p style="text-align: justify;"><strong><span style="font-size: 11pt;">b.&nbsp;</span><span style="font-size: 11pt;">Câu nghi vấn sử dụng từ hỏi bắt đầu bằng Wh-</span></strong></p>
<table style="border-collapse: collapse;" border="-">
<tbody>
<tr>
<td width="84">
<p><span style="font-size: 11pt;"><u>&nbsp;</u></span></p>
</td>
<td width="275">
<p><span style="font-size: 11pt;">Động từ to “be”</span></p>
</td>
<td colspan="2" width="289">
<p><span style="font-size: 11pt;">Động từ chỉ hành động</span></p>
</td>
</tr>
<tr>
<td width="84">
<p><span style="font-size: 11pt;">Công thức</span></p>
</td>
<td colspan="2" width="275">
<p><span style="font-size: 11pt;">Wh- + am/&nbsp;are/&nbsp;is&nbsp;(not)&nbsp;+ S + N/Adj?</span></p>
</td>
<td width="289">
<p><span style="font-size: 11pt;">Wh- + do/ does (not)&nbsp;+ S +&nbsp;V (nguyên thể)….?</span></p>
</td>
</tr>
<tr>
<td width="84">
<p><span style="font-size: 11pt;">Ví dụ</span></p>
</td>
<td colspan="2" width="275">
<p><span style="font-size: 11pt;"><em>- Where are you from? </em><em>(Bạn đến từ đâu?)</em></span></p>
<p><span style="font-size: 11pt;"><em>- Who are they? </em><em>(Họ là ai?)</em></span></p>
</td>
<td width="289">
<p><span style="font-size: 11pt;"><em>- Where do you come from?</em><em> (Bạn đến từ đâu?)</em></span></p>
<p><span style="font-size: 11pt;"><em>- What do you do? (Bạn làm nghề gì?)</em></span></p>
</td>
</tr>
</tbody>
</table>
<h4 style="text-align: justify;"><span style="font-size: 12pt;"><strong><br>4. Cách dùng thì hiện tại đơn trong trường hợp thường</strong></span></h4>
<p style="text-align: justify;"><span style="font-size: 11pt;">Thì hiện tại đơn được sử dụng để:</span></p>
<ul style="line-height: 200%;">
<li style="text-align: justify;"><span style="font-size: 11pt;">Nói về một thói quen lặp đi lặp lại hàng ngày: <em>I alway get up at 6.am&nbsp;</em></span></li>
<li style="text-align: justify;"><span style="font-size: 11pt;"><span style="font-size: 11pt;">Nói về sự thật, chân lý hiển nhiên:</span></span>&nbsp;<em><span style="font-size: 11pt;">The sun sets in the west</span></em></li>
<li style="text-align: justify;"><span style="font-size: 11pt;">Nói về khả năng của ai đó: <em>She plays basketball very well</em></span></li>
</ul>
<p style="text-align: justify;"><span style="font-size: 11pt;">Trong <em>cách sử dụng thì hiện tại đơn</em> thường xuất hiện các trạng từ chỉ tần suất cơ bản như: <em>always, usually, often, sometimes, rarely, everyday, once a month, in the morning, once in a blue moon</em>…</span></p>
<p style="text-align: justify;"><span style="font-size: 11pt;">Tuy nhiên,&nbsp;những từ/cụm từ trên khá phổ biến và nhàm chán, khi đưa vào câu trong IELTS cũng chỉ sử dụng 1 cấu trúc là <em>S + adverb + verb</em>, khiến cho thí sinh không thể hiện được sự đa dạng về ngữ pháp. Nên hãy tham khảo những cụm từ thay thế dưới đây.</span></p>
<h4 style="text-align: justify;"><span style="font-size: 12pt;"><strong>5. Một số cụm từ thay thế hay để sử dụng trong bài thi IELTS</strong></span></h4>
<p style="text-align: justify;"><span style="font-size: 11pt;">Để đa dạng ngữ pháp, IELTS Fighter khuyên các bạn:</span></p>
<ul style="line-height: 200%;">
<li><span style="font-size: 11pt;">KHÔNG CẦN phải sử dụng liên tục.</span></li>
<li><span style="font-size: 11pt;">Tìm những câu thành ngữ, những cách nói hay hơn. Dưới đây là một số cụm từ dễ “ghi điểm” mà các bạn có thể tham khảo.</span></li>
</ul>
<table style="border-collapse: collapse;" border="-">
<tbody>
<tr>
<td width="208">
<p><span style="font-size: 11pt;">(to) have one’s moments</span></p>
<p><span style="font-size: 11pt;"><em>= sometimes</em></span></p>
</td>
<td width="387">
<p><span style="font-size: 11pt;">I am not usually lazy, but I <em><u>have my moments</u></em>.</span></p>
</td>
</tr>
<tr>
<td width="208">
<p><span style="font-size: 11pt;">(every) now and then/again</span></p>
<p><span style="font-size: 11pt;"><em>= sometimes</em></span></p>
</td>
<td width="387">
<p><span style="font-size: 11pt;">I have to cut down on my sugar intake, but <em><u>every now and then</u></em> I indulge myself with some quality dark chocolate.</span></p>
</td>
</tr>
<tr>
<td width="208">
<p><span style="font-size: 11pt;">like clockwork</span></p>
<p><span style="font-size: 11pt;"><em>= always</em></span></p>
</td>
<td width="387">
<p><span style="font-size: 11pt;">My father walks the dog every morning <em><u>like clockwork</u></em>.</span></p>
</td>
</tr>
</tbody>
</table>
<h4 style="text-align: justify;"><strong><span style="font-size: 11pt;"><br><span style="font-size: 12pt;">6. Cách sử dụng của thì hiện tại đơn trong bài thi IELTS</span></span></strong></h4>
<p><strong><span style="font-size: 11pt;">a. Mở đầu Speaking part 1/2/3 và Writing task 1/2</span></strong></p>
<p style="text-align: justify;"><span style="text-decoration: underline;"><span style="font-size: 11pt;">Ví dụ:</span></span></p>
<ul style="text-align: justify;">
<li><span style="font-size: 11pt;"><u>I am a third-year student</u> in Internal Auditing. (Tôi đang là sinh viên năm thứ ba học ngành Kiểm toán nội bộ) (Mở đầu - Speaking part 1)</span></li>
<li><span style="font-size: 11pt;">Well, <u>my most favorite item of clothing is</u> the yellow crop-top. (Món đồ tôi thích nhất là chiếc áo crop-top màu vàng) (Mở đầu - Speaking part 2 – “Describe your most favorite item of clothing” – Mô tả món đồ mà bạn yêu thích nhất)</span></li>
<li><span style="font-size: 11pt;"><u>I think</u> students should go to universities rather than vocational training courses. (Tôi nghĩ rằng sinh viên nên học đại học hơn là học nghề) (Mở đầu – Speaking part 3)</span></li>
</ul>
<p><strong><span style="font-size: 11pt;">b. Mô tả sự thật trong Speaking part 1/2/3</span></strong></p>
<p style="text-align: justify;"><span style="font-size: 11pt;">&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;<span style="text-decoration: underline;">Ví dụ:</span></span></p>
<ul style="text-align: justify;">
<li><span style="font-size: 11pt;">Advertisements <u>are</u> very relaxing and eye-catching. (Quảng cáo rất mang tính giải trí và bắt mắt) (Sự thật)</span></li>
<li><span style="font-size: 11pt;">Lady Gaga <u>is</u> famous all over the world. (Lady Gaga nổi tiếng trên toàn thế giới) (Sự thật)</span></li>
</ul>
<p><span style="font-size: 11pt;">&nbsp;Ngoài thì hiện tại đơn, các bạn cần học đầy đủ các thì khác để củng cố kiến thức nền tảng của mình. </span></p>
<p><span style="font-size: 11pt;">Hãy xem ngay bài viết <span style="color: #0000ff;"><strong><a style="color: #0000ff;" title="Các thìtrong tiếng Anh và công thức, bài tập" href="https://ielts-fighter.com/tin-tuc/Cac-thi-trong-tieng-Anh-co-ban-Tong-hop-cong-thuc-va-bai-tap-co-dap-an_mt1560426092.html" target="_blank">Các thì trong tiếng Anh với công thức, cách học hiệu quả, nhớ lâu</a></strong></span> nhé!</span></p>
<form class="ielts-form" style="text-align: center;" action="/index/registercounsel" method="POST">
<div style="display: inline-block; border: 1px solid grey; padding: 20px; width: 350px; resize: both; overflow: auto; max-width: 100%; border-radius: 10px;"><input id="type" class="type_select" name="type" type="hidden" value="1"> <input id="current_url" class="type_select" name="current_url" type="hidden" value="">
<div class="row">
<h4 class="ielts-form" style="background: none; padding-left: 0px; margin-bottom: 0px;">Đăng ký thi thử ielts miễn phí</h4>
</div>
<div class="row">
<p class="field"><input id="name" class="form-control" name="fullname" required="" type="text" placeholder="Họ tên *"></p>
</div>
<div class="row">
<p class="field"><input id="email" class="form-control" name="email" required="" type="email" placeholder="Email *"></p>
</div>
<div class="row">
<p class="field"><input id="phone" class="form-control" name="phone" required="" type="tel" placeholder="Số điện thoại *"></p>
</div>
<div class="row">
<div class="col-xss-12 margin-b-20"><select id="address" class="form-control" style="padding: 10px; width: 100%; margin-bottom: 10px;" name="address" required=""><option disabled="">Cơ sở Hà Nội</option>                    <option value="254 Hoàng Văn Thái, P. Khương Trung, Q. Thanh Xuân [131]">254 Hoàng Văn Thái, P. Khương Trung, Q. Thanh Xuân</option>                    <option value="44 Trần Quốc Hoàn, Q. Cầu Giấy [80]">44 Trần Quốc Hoàn, Q. Cầu Giấy</option>                    <option value="456 Xã Đàn, Đống Đa [137]">456 Xã Đàn, Đống Đa</option>                    <option value="388 Nguyễn Văn Cừ, Long Biên [82]">388 Nguyễn Văn Cừ, Long Biên</option>                    <option value="22 Nguyễn Hoàng (gần bx Mỹ Đình) [79]">22 Nguyễn Hoàng (gần bx Mỹ Đình)</option>                    <option value="737 Quang Trung, Hà Đông [134]">737 Quang Trung, Hà Đông</option>                    <option value="18 LK6C Nguyễn Văn Lộc, Hà Đông [72]">18 LK6C Nguyễn Văn Lộc, Hà Đông</option>                    <option value="107 Xuân La - Số nhà D21, P. Xuân Đỉnh, Q. Bắc Từ Liêm [142]">107 Xuân La - Số nhà D21, P. Xuân Đỉnh, Q. Bắc Từ Liêm</option>                    <option disabled="">Cơ sở Hồ Chí Minh</option>                    <option value="350 đường 3/2 - Phường 12, Quận 10 [54]">350 đường 3/2 - Phường 12, Quận 10</option>                    <option value="Số 94, Đường Cộng Hòa, Quận Tân Bình [55]">Số 94, Đường Cộng Hòa, Quận Tân Bình</option>                    <option value="Số 85 Điện Biên Phủ, Quận Bình Thạnh [56]">Số 85 Điện Biên Phủ, Quận Bình Thạnh</option>                    <option value="L39.6, khu Cityland, 18 Phan Văn Trị, Gò Vấp [57]">L39.6, khu Cityland, 18 Phan Văn Trị, Gò Vấp</option>                    <option value="A11 Bà Hom, Phường 13, Quận 6, HCM [58]">A11 Bà Hom, Phường 13, Quận 6, HCM</option>                    <option value="66B Hoàng Diệu 2 Thủ Đức, HCM [53]">66B Hoàng Diệu 2 Thủ Đức, HCM</option>                    <option value="926B Tạ Quang Bửu, Quận 8 [135]">926B Tạ Quang Bửu, Quận 8, HCM</option>                    <option value="386 Nguyễn Thị Minh Khai, HCM [136]">386 Nguyễn Thị Minh Khai, Phường 5, Quận 3, HCM</option>                    <option value="76 Trường Chinh, P.Tân Hưng Thuận, Q.12 [139]">76 Trường Chinh, P.Tân Hưng Thuận, Q.12</option>                    <option disabled="">Cơ sở Đà Nẵng</option>                    <option value="233 Nguyễn Văn Linh, Thanh Khê [103]">233 Nguyễn Văn Linh, Thanh Khê</option>                    <option value="254 Tôn Đức Thắng, P. Hòa Minh, Q. Liên Chiểu [122]">254 Tôn Đức Thắng, P. Hòa Minh, Q. Liên Chiểu</option>                    <option value="226 Ngũ Hành Sơn, P. Mỹ An, Q. Ngũ Hành Sơn [141]">226 Ngũ Hành Sơn, P. Mỹ An, Q. Ngũ Hành Sơn</option>                    <option disabled="">Cơ sở Hải Phòng</option>                    <option value="428 Lạch Tray, Ngô Quyền, Hải Phòng [123]">428 Lạch Tray, Ngô Quyền, Hải Phòng</option>                    <option disabled="">Cơ sở Bình Dương</option>                    <option value="9-11 đường Yersin, TP. Thủ Dầu Một [140]">9-11 đường Yersin, TP. Thủ Dầu Một</option></select></div>
</div>
<div class="row">
<p class="field"><input id="counsel_content" class="form-control" name="counsel_content" type="text" placeholder="Bạn cần tư vấn gì?"></p>
</div>
<div class="row">
<div class="col-xss-12 text-center"><input name="type" type="hidden" value="2"> <button id="btn_submit" class="btnform btn-primary" style="padding: 10px; width: 100%;" type="submit">Gửi đăng ký</button></div>
</div>
</div>
</form><form class="ielts-form" style="text-align: center;" action="/index/registercounsel" method="POST"></form>
<h2><span style="color: #ff0000;"><strong><span style="font-size: 12pt;">II. BÀI TẬP THÌ HIỆN TẠI ĐƠN</span></strong></span></h2>
<p style="text-align: justify;"><span style="font-size: 11pt;"><strong>Dưới đây là một số bài tập về thì hiện tại đơn, các bạn xem đáp án ở phía sau.</strong></span></p>
<p style="text-align: justify;"><span style="font-size: 11pt;"><strong><span style="text-decoration: underline;">Exercise 1:</span></strong> Cho dạng đúng của động từ trong mỗi câu sau.</span></p>
<p><span style="font-size: 11pt;">1. My mom always ................................delicious meals. (make)</span></p>
<p><span style="font-size: 11pt;">2. Charlie…………………………..eggs. (not eat)</span></p>
<p><span style="font-size: 11pt;">3. Susie………………………….shopping every week. (go)</span></p>
<p><span style="font-size: 11pt;">4. ................................ Minh and Hoa ................................ to work by bus every day? (go)</span></p>
<p><span style="font-size: 11pt;">5. ................................ your parents ................................with your decision? (agree)</span></p>
<p><span style="font-size: 11pt;">6. Where……………………..he………………………from? (come)</span></p>
<p><span style="font-size: 11pt;">7. Where ................................ your father ................................? (work)</span></p>
<p><span style="font-size: 11pt;">8. Jimmy ................................. usually ................................ the trees. (not water)</span></p>
<p><span style="font-size: 11pt;">9. Who ................................the washing in your house? (do)</span></p>
<p><span style="font-size: 11pt;">10. They ................................ out once a month. (eat)</span></p>
<p style="text-align: justify;"><span style="font-size: 11pt;"><strong><span style="text-decoration: underline;">Exercise 2:</span></strong> Mỗi câu sau chứa MỘT lỗi sai. Tìm và sửa chúng.</span></p>
<p><span style="font-size: 11pt;">1. I often gets up early to catch the bus to go to work.</span></p>
<p style="text-align: justify;"><span style="font-size: 11pt;">………………………………………………………………………</span></p>
<p><span style="font-size: 11pt;">2. She teach students in a local secondary school.</span></p>
<p style="text-align: justify;"><span style="font-size: 11pt;">………………………………………………………………………</span></p>
<p><span style="font-size: 11pt;">3. They doesn’t own a house. They still have to rent one to live.</span></p>
<p style="text-align: justify;"><span style="font-size: 11pt;">………………………………………………………………………</span></p>
<p><span style="font-size: 11pt;">4. Bui Tien Dung am a famous goalkeeper in the National Football Team.</span></p>
<p style="text-align: justify;"><span style="font-size: 11pt;">………………………………………………………………………</span></p>
<p><span style="font-size: 11pt;">7. What do your sister do?</span></p>
<p style="text-align: justify;"><span style="font-size: 11pt;">………………………………………………………………………</span></p>
<p><span style="font-size: 11pt;">8. John and Harry doesn’t go swimming in the lake.</span></p>
<p style="text-align: justify;"><span style="font-size: 11pt;">………………………………………………………………………</span></p>
<p><span style="font-size: 11pt;">9. Liam speak Chinese very well.</span></p>
<p style="text-align: justify;"><span style="font-size: 11pt;">………………………………………………………………………</span></p>
<p><span style="font-size: 11pt;">10. How often does she goes shopping in the supermarket?</span></p>
<p style="text-align: justify;"><span style="font-size: 11pt;">………………………………………………………………………</span></p>
<p><span style="font-size: 11pt;">11. Our dogs aren’t eat bones.</span></p>
<p style="text-align: justify;"><span style="font-size: 11pt;">………………………………………………………………………</span></p>
<p><span style="font-size: 11pt;">12. Claire’s parents is very friendly and helpful.</span></p>
<p style="text-align: justify;"><span style="font-size: 11pt;">………………………………………………………………………</span></p>
<p style="text-align: justify;"><span style="font-size: 11pt;"><strong><span style="text-decoration: underline;">Exercise 3:</span></strong> Chia những động từ sau ở thì hiện tại đơn để tạo thành một bài IELTS Writing task 1 có nghĩa.</span></p>
<p style="text-align: justify;"><span style="font-size: 11pt;">" The diagram below shows the stages and equipment used in the cement-making process, and how cement is used to produce concrete for building purposes.</span></p>
<p style="text-align: justify;"><span style="font-size: 11pt;">Summarize the information by selecting and reporting the main features and make comparisons where relevant.</span></p>
<p style="text-align: justify;"><span style="font-size: 11pt;">Write at least 150 words.</span></p>
<p style="text-align: center;"><span style="font-size: 11pt;"><img src="http://static.ielts-fighter.com/uploads/2018/12/19/thi-hien-tai-don-bt-1.jpg" alt="bài tập thì hiện tại đơn" width="839" height="598"></span></p>
<p style="text-align: justify;"><span style="font-size: 11pt;">The diagrams (1 – illustrate)…………………………….the way in which cement is made and how it is then used in the process of making concrete. Overall, limestone and clay (2-pass)……………………… through four stages before being bagged ready for use as cement which then (3-account) for 15% of the four materials used to produce concrete. While the process of making cement (4-use)………………………..a number of tools, the production of concrete (4-require) only a concrete mixer.</span></p>
<p style="text-align: justify;"><span style="font-size: 11pt;">In the first stage of making cement, limestone and clay (5-be)……………..crushed together to form a powder. This powder (6-be)………………then combined in a mixer before passing into a rotating heater which (7-have)………………… constant heat applied at one end of the tube. The resulting mixture is ground in order to produce cement. The final product is afterwards put into bags ready to be used.</span></p>
<p style="text-align: justify;"><span style="font-size: 11pt;">Regarding the second diagram, concrete (8-consist)………………………of mainly gravel, which is small stones, and this makes up 50% of the ingredients. The other materials used are sand (25%), cement (15%) and water (10%). These are all poured into a concrete mixer which continually rotates to combine the materials and ultimately produces concrete."</span></p>
<p style="text-align: right;"><em><span style="font-size: 11pt;">(187 words, Band 9.0)</span></em></p>
<p style="text-align: justify;"><span style="font-size: 11pt;"><strong><span style="text-decoration: underline;">Exercise 4:</span></strong> Trả lời những câu hỏi sau sử dụng những trạng từ tần suất ở phần lý thuyết.</span></p>
<p><span style="font-size: 11pt;">1. How often do you buy a new item of clothing?</span></p>
<p style="text-align: justify;"><span style="font-size: 11pt;">…………………………………………………………………….</span></p>
<p><span style="font-size: 11pt;">2. When do you often eat breakfast in the morning?</span></p>
<p style="text-align: justify;"><span style="font-size: 11pt;">…………………………………………………………………….</span></p>
<p><span style="font-size: 11pt;">3. What do you do?</span></p>
<p style="text-align: justify;"><span style="font-size: 11pt;">…………………………………………………………………….</span></p>
<p><span style="font-size: 11pt;">4. Do you have a pet?</span></p>
<p style="text-align: justify;"><span style="font-size: 11pt;">…………………………………………………………………….</span></p>
<p><span style="font-size: 11pt;">5. Are you afraid of spiders?</span></p>
<p style="text-align: justify;"><span style="font-size: 11pt;">…………………………………………………………………….</span></p>
<p style="text-align: justify;"><span style="font-size: 11pt;"><strong><span style="text-decoration: underline;">Exercise 5:</span></strong> Cho dạng đúng của những từ trong ngoặc để tạo thành câu có nghĩa.</span></p>
<p><span style="font-size: 11pt;">1. It (be)………………a fact that smart phone (help)………………..us a lot in our life.</span></p>
<p><span style="font-size: 11pt;">2. I often (travel)………………..to some of my favorite destinations every summer.</span></p>
<p><span style="font-size: 11pt;">3. Our Math lesson usually (finish)…………………….at 4.00 p.m.</span></p>
<p><span style="font-size: 11pt;">4. The reason why Susan (not eat)……………………….meat is that she (be)…………a vegetarian.</span></p>
<p><span style="font-size: 11pt;">5. People in Ho Chi Minh City (be)………..very friendly and they (smile)………………a lot.</span></p>
<p><span style="font-size: 11pt;">6. The flight (start)………………..at 6 a.m every Thursday.</span></p>
<p><span style="font-size: 11pt;">7. Peter (not study)…………………………very hard. He never gets high scores.</span></p>
<p><span style="font-size: 11pt;">8. I like oranges and she (like)……………..apples.</span></p>
<p><span style="font-size: 11pt;">9. My mom and my sister (cook)…………………….lunch everyday.</span></p>
<p><span style="font-size: 11pt;">10. They (have)…………………breakfast together every morning.</span></p>
<p style="text-align: justify;"><span style="font-size: 11pt;">&nbsp;</span><span style="font-size: 11pt;">&nbsp;</span></p>
<p style="text-align: justify;"><span style="text-decoration: underline;"><strong><span style="font-size: 11pt; color: #ff0000; text-decoration: underline;">ĐÁP ÁN</span></strong></span></p>
<p style="text-align: justify;"><strong><span style="font-size: 11pt;">Exercise 1: </span></strong></p>
<table border="-">
<tbody>
<tr>
<td width="198">
<p><span style="font-size: 11pt;">1. makes</span></p>
<p><span style="font-size: 11pt;">2. doesn’t eat</span></p>
<p><span style="font-size: 11pt;">3. goes</span></p>
<p><span style="font-size: 11pt;">4. do…go</span></p>
<p><span style="font-size: 11pt;">5. Do…agree</span></p>
</td>
<td width="210">
<p><span style="font-size: 11pt;">6. does…come</span></p>
<p><span style="font-size: 11pt;">7. does…work</span></p>
<p><span style="font-size: 11pt;">8. doesn’t usually water</span></p>
<p><span style="font-size: 11pt;">9. does</span></p>
<p><span style="font-size: 11pt;">10. eat</span></p>
</td>
</tr>
</tbody>
</table>
<p style="text-align: justify;"><span style="font-size: 11pt;">&nbsp;</span></p>
<p style="text-align: justify;"><strong><span style="font-size: 11pt;">Exercise 2: </span></strong></p>
<table border="-">
<tbody>
<tr>
<td width="198">
<p><span style="font-size: 11pt;">1. gets =&gt; get</span></p>
<p><span style="font-size: 11pt;">2. teach =&gt; teaches</span></p>
<p><span style="font-size: 11pt;">3. doesn’t =&gt; don’t</span></p>
<p><span style="font-size: 11pt;">4. am =&gt; is</span></p>
<p><span style="font-size: 11pt;">5. do your =&gt; does your</span></p>
</td>
<td width="210">
<p><span style="font-size: 11pt;">6. doesn’t =&gt; don’t</span></p>
<p><span style="font-size: 11pt;">7. speak =&gt; speaks</span></p>
<p><span style="font-size: 11pt;">8. goes =&gt; go</span></p>
<p><span style="font-size: 11pt;">9. aren’t =&gt; don’t</span></p>
<p><span style="font-size: 11pt;">10. is =&gt; are</span></p>
</td>
</tr>
</tbody>
</table>
<p style="text-align: justify;"><span style="font-size: 11pt;">&nbsp;</span></p>
<p style="text-align: justify;"><strong><span style="font-size: 11pt;">Exercise 3: </span></strong></p>
<table border="-">
<tbody>
<tr>
<td width="198">
<p><span style="font-size: 11pt;">1. illustrate</span></p>
<p><span style="font-size: 11pt;">2. pass</span></p>
<p><span style="font-size: 11pt;">3. accounts</span></p>
<p><span style="font-size: 11pt;">4. uses</span></p>
</td>
<td width="210">
<p><span style="font-size: 11pt;">5. are</span></p>
<p><span style="font-size: 11pt;">6. is</span></p>
<p><span style="font-size: 11pt;">7. has</span></p>
<p><span style="font-size: 11pt;">8. consists</span></p>
</td>
</tr>
</tbody>
</table>
<p style="text-align: justify;"><span style="font-size: 11pt;">&nbsp;</span></p>
<p style="text-align: justify;"><strong><span style="font-size: 11pt;">Exercise 4: (Tùy vào kinh nghiệm cá nhân của các bạn)</span></strong></p>
<p style="text-align: justify;"><strong><span style="font-size: 11pt;">Exercise 5: </span></strong></p>
<table border="-">
<tbody>
<tr>
<td width="198">
<p><span style="font-size: 11pt;">1. is, helps</span></p>
<p><span style="font-size: 11pt;">2. travel</span></p>
<p><span style="font-size: 11pt;">3. finishes</span></p>
<p><span style="font-size: 11pt;">4. doesn’t eat, is</span></p>
<p><span style="font-size: 11pt;">5. are, smile</span></p>
</td>
<td width="210">
<p><span style="font-size: 11pt;">6. starts</span></p>
<p><span style="font-size: 11pt;">7. doesn’t study</span></p>
<p><span style="font-size: 11pt;">8. likes</span></p>
<p><span style="font-size: 11pt;">9. cook</span></p>
<p><span style="font-size: 11pt;">10. have</span></p>
<p>&nbsp;</p>
</td>
</tr>
</tbody>
</table>
<p style="text-align: justify;">&nbsp;</p>
<p style="text-align: justify;"><span style="font-size: 11pt;">Vậy là bài học về thì hiện tại đơn - thì dễ nhất trong tiếng Anh đã hoàn thành rồi. Các bạn nhớ làm bài tập đầy đủ để đảm bảo thuộc được thì và nhớ rõ hơn. Chúc các bạn học tập tốt và đạt điểm cao!</span></p>
<table style="background-color: #fbdbac;">
<tbody>
<tr>
<td>
<p><em><span style="font-size: 11pt;">Các bạn tiếp tục với bài học về thì và thông tin khác:</span></em></p>
<ul>
<li><strong><span style="font-size: 11pt; color: #0000ff;"><a style="color: #0000ff;" title="Thì hiện tại tiếp diễn" href="https://ielts-fighter.com/tin-tuc/HIEN-TAI-TIEP-DIEN-Present-Continuous-Cong-thuc-dau-hieu-va-bai-tap-giai-chi-tiet_mt1544220374.html" target="_blank">Thì hiện tại tiếp diễn - từ A - Z</a></span></strong></li>
<li><strong><span style="font-size: 11pt; color: #0000ff;"><a style="color: #0000ff;" title="Thì hiện tại hoàn thành tổng hợp" href="https://ielts-fighter.com/tin-tuc/Hien-tai-hoan-thanh-Present-Perfect-Cong-thuc-va-bai-tap-co-dap-an-chi-tiet_mt1545083332.html" target="_blank">Thì hiện tại hoàn thành tổng hợp</a> </span></strong></li>
<li><strong><span style="font-size: 11pt; color: #0000ff;"><a style="color: #0000ff;" title="IELTS là gì? Tất tần tật về kỳ thi IELTS?" href="https://ielts-fighter.com/tin-tuc/IELTS-la-gi-Tat-tan-tat-ve-ki-thi-IELTS_mt1464318919.html" target="_blank">IELTS là gì? Tất tần tật về kỳ thi IELTS?</a></span></strong></li>
</ul>
</td>
</tr>
</tbody>
</table>                        </div>`


    const { item } = props.route?.params;
    const [grammarDescription,setGrammarDescription] = React.useState(null);


    React.useLayoutEffect(() => {
        props.navigation.dangerouslyGetParent().setOptions({
            tabBarVisible: false
        })

        return () => {
            props.navigation.dangerouslyGetParent().setOptions({
                tabBarVisible: true
            })
        }
    }, []);


    const _onGrammarExcercisePress = () => {
        props.navigation.push('GrammarExcerciseScreen',{
            item:item
        });
    }

    React.useEffect(() => {
        GrammarAPI.getGrammarDescription(item?.id)
            .then(res => {
                if(res.status_code === 200){
                    setGrammarDescription(res?.data);
                }
            })
            .catch((err) => {
                console.log('error: ', err)
            })
    }, [])

    return (
        <View
            style={{
                display: 'flex',
                flex: 1,
                backgroundColor: COLORS.white,

            }}
        >
            <WebView
                originWhitelist={['*']}
                source={{ html: grammarDescription?.body }}
                style={{
                    paddingHorizontal: 6
                }}
            />



            <View
                style={{
                    position: 'absolute',
                    bottom: 6,
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center'
                }}
            >
                <TouchableOpacity
                    style={{
                        backgroundColor: COLORS.primary,
                        padding: 8,
                        borderRadius: SIZES.base,
                        ...BOXSHADOW.normal,
                    }}
                    onPress={_onGrammarExcercisePress}
                >
                    <Text style={[{ color: COLORS.white }, FONTS.h4]}>Luyện Tập</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default GrammarDescriptionScreen

const styles = StyleSheet.create({})
