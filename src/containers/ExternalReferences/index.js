import React, { Component } from "react";
import newslogo from "../../../static/newslogo.png";
import { InTheNewsComponent } from "../../components/InTheNewsComponent";
import { AppFooter, AppHeader } from "../App";
import "./index.scss";

export class ExternalReferences extends Component {
  render() {
    return (
      <div className="app-container">
        <AppHeader />
        <h1 className="center">
          <b>
            <u>References</u>
          </b>
        </h1>
        <br></br>
        <div className="row references">
          <div className="col-md-12">
            <br></br>
            <ul>
                <li>Fearless Steps: Apollo-11 Corpus Advancements for Speech Technologies from Earth to the Moon <a href='https://www.isca-speech.org/archive/Interspeech_2018/abstracts/1942.html'>[abstract]</a> <a href="https://www.isca-speech.org/archive/Interspeech_2018/pdfs/1942.pdf">[paper]</a> <a href="https://exploreapollo-audiodata.s3.amazonaws.com/Citations/Overview">[citation]</a></li>
                <li>The 2019 Inaugural Fearless Steps Challenge: A Giant Leap for Naturalistic Audio<a href="https://www.isca-speech.org/archive/Interspeech_2019/abstracts/2301.html"> [abstract]</a> <a href="https://pdfs.semanticscholar.org/181d/41545fbf71953399f2df48bc9f1cc3612743.pdf"> [paper] </a> <a href="https://exploreapollo-audiodata.s3.amazonaws.com/Citations/ISCA2019"> [citation] </a> </li>
                <li>Speech Activity Detection for NASA Apollo Space Missions: Challenges and Solutions <a href="https://www.isca-speech.org/archive/interspeech_2014/i14_1544.html"> [abstract]</a> <a href="https://www.isca-speech.org/archive/archive_papers/interspeech_2014/i14_1544.pdf"> [paper] </a> <a href="https://exploreapollo-audiodata.s3.amazonaws.com/Citations/SAD"> [citation] </a> </li>
                <li>I-vector/plda speaker recognition using support vectors with discriminant analysis <a href="https://ieeexplore.ieee.org/abstract/document/7953190"> [abstract]</a> <a href="https://ieeexplore.ieee.org/stamp/stamp.jsp?tp=&amp;arnumber=7953190"> [paper] </a> <a href="https://exploreapollo-audiodata.s3.amazonaws.com/Citations/SID"> [citation] </a> </li>
                <li>[2020] FEARLESS STEPS Challenge (FS-2): Supervised Learning with Massive Naturalistic Apollo Data<a href="http://www.interspeech2020.org/index.php?m=content&amp;c=index&amp;a=show&amp;catid=322&amp;id=843"> [abstract]</a> <a href="http://www.interspeech2020.org/uploadfile/pdf/Wed-SS-2-3-5.pdf"> [paper] </a> <a href="https://exploreapollo-audiodata.s3.amazonaws.com/Citations/FS2020.txt"> [citation] </a> </li>
                <li>The DKU-Duke-Lenovo System Description for the Fearless Steps Challenge Phase III <a href="https://www.isca-speech.org/archive/interspeech_2021/wang21i_interspeech.html"> [abstract]</a> <a href="https://www.isca-speech.org/archive/pdfs/interspeech_2021/wang21i_interspeech.pdf"> [paper] </a> <a href="https://exploreapollo-audiodata.s3.amazonaws.com/Citations/wang21i.txt"> [citation] </a></li>
                <li>Unsupervised Representation Learning for Speech Activity Detection in the Fearless Steps Challenge 2021 <a href="https://www.isca-speech.org/archive/interspeech_2021/gimeno21_interspeech.html"> [abstract]</a> <a href="https://www.isca-speech.org/archive/pdfs/interspeech_2021/gimeno21_interspeech.pdf"> [paper] </a> <a href="https://exploreapollo-audiodata.s3.amazonaws.com/Citations/gimeno21.txt"> [citation] </a></li>
                <li>The Application of Learnable STRF Kernels to the 2021 Fearless Steps Phase-03 SAD Challenge <a href="https://www.isca-speech.org/archive/interspeech_2021/vuong21_interspeech.html"> [abstract]</a> <a href="https://www.isca-speech.org/archive/pdfs/interspeech_2021/vuong21_interspeech.pdf"> [paper] </a> <a href="https://exploreapollo-audiodata.s3.amazonaws.com/Citations/vuong21.txt"> [citation] </a></li>
                <li>EML Online Speech Activity Detection for the Fearless Steps Challenge Phase-III <a href="https://www.isca-speech.org/archive/interspeech_2021/ghahabi21_interspeech.html"> [abstract]</a> <a href="https://www.isca-speech.org/archive/pdfs/interspeech_2021/ghahabi21_interspeech.pdf"> [paper] </a> <a href="https://exploreapollo-audiodata.s3.amazonaws.com/Citations/ghahabi21.txt"> [citation] </a></li>
                <li>Fearless Steps Challenge Phase-3 (FSC P3): Advancing SLT for Unseen Channel and Mission Data Across NASA Apollo Audio <a href="https://www.isca-speech.org/archive/interspeech_2021/joglekar21_interspeech.html"> [abstract]</a> <a href="https://www.isca-speech.org/archive/pdfs/interspeech_2021/joglekar21_interspeech.pdf"> [paper] </a> <a href="https://exploreapollo-audiodata.s3.amazonaws.com/Citations/joglekar21.txt"> [citation] </a></li>
                
                
            </ul>
            
          </div>
          <br></br>
        </div>
        <AppFooter />
      </div>
    );
  }
}
