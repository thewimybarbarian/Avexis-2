/* Footer AVEXIS wordmark + gleam — !important to override any dynamic injections */
.av-footer {
  position: relative;
  padding: 60px 40px 32px;
  border-top: 1px solid var(--dark-border);
  background: #000;
}
.av-footer__mark {
  position: relative;
  display: block;
  margin: 0 auto 40px;
  text-align: center;
  line-height: .85;
  overflow: hidden;
  max-width: 100%;
}
.av-footer__mark-text {
  display: inline-block !important;
  font-family: var(--display) !important;
  font-weight: 900 !important;
  font-size: clamp(60px, 14vw, 200px) !important;
  letter-spacing: .04em !important;
  color: #3a3a5c !important;
  background-image: linear-gradient(
    110deg,
    #3a3a5c 0%,
    #3a3a5c 35%,
    #ffffff 48%,
    var(--cyan, #00D4FF) 50%,
    #ffffff 52%,
    #3a3a5c 65%,
    #3a3a5c 100%
  ) !important;
  background-size: 200% 100% !important;
  background-position: 100% 0 !important;
  background-repeat: no-repeat !important;
  -webkit-background-clip: text !important;
  background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
  animation: avFooterGleam 3s linear infinite !important;
  filter: drop-shadow(0 0 40px rgba(0, 212, 255, 0.4));
}
@keyframes avFooterGleam {
  0%   { background-position: 100% 0; }
  100% { background-position: -100% 0; }
}
.av-footer__mark-gleam { display: none; }

.av-footer__grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 40px;
  margin: 40px 0;
  padding-top: 40px;
  border-top: 1px solid var(--dark-border);
}
.av-footer__grid p {
  color: var(--gray-light);
  font-size: 14px;
  line-height: 1.6;
  margin-top: 12px;
  max-width: 340px;
}
.av-footer__grid ul {
  list-style: none;
  padding: 0;
  margin: 12px 0 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.av-footer__grid ul a {
  color: var(--gray-light);
  font-size: 14px;
  transition: color .2s var(--ease);
}
.av-footer__grid ul a:hover { color: var(--cyan); }
.av-footer__foot {
  display: flex;
  justify-content: space-between;
  padding-top: 20px;
  border-top: 1px solid var(--dark-border);
}
@media (max-width: 980px) {
  .av-footer__grid { grid-template-columns: 1fr 1fr; }
  .av-footer__foot { flex-direction: column; gap: 8px; }
}
