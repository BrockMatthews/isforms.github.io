(function () {
    window.addEventListener('load', function () {
        console.log("DEBUG: Initializing form script");

        const doc = loader.getEngine().getDocument()
        const canvas = doc.getElementById('drawCanvas');
        const ctx = canvas.getContext('2d');

        const entry = doc.getElementById(118709913);

        const viewerUrl = "https://brockmatthews.github.io/isforms.github.io/image-renderer";

        ctx.lineWidth = 2;
        ctx.strokeStyle = "#ff0000";
        let drawing = false;

        function getPos(e) {
            const rect = canvas.getBoundingClientRect();
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            return { x: clientX - rect.left, y: clientY - rect.top };
        }

        function startDraw(e) {
            console.log("DEBUG: Starting drawing");
            drawing = true;
            const { x, y } = getPos(e);
            ctx.beginPath();
            ctx.moveTo(x, y);
        }

        function draw(e) {
            if (!drawing) return;
            const { x, y } = getPos(e);
            ctx.lineTo(x, y);
            ctx.stroke();
        }

        function stopDraw() {
            drawing = false;
            updateHidden();
        }

        function formatRenderer(dataUrl) {
            return `${viewerUrl}#${encodeURIComponent(dataUrl)}`;
        }

        function updateHidden() {
            // doc.getElementById('drawingData').value = formatRenderer(canvas.toDataURL('image/png'));
            const data = formatRenderer(canvas.toDataURL('image/png'));
            console.log("DEBUG: Updating hidden field with data:", data);

            // doc.getElementById('drawingData').value = data;
            entry.setValue(data);
        }

        doc.getElementById('resetBtn').addEventListener('click', () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            updateHidden();
        });

        canvas.addEventListener('mousedown', startDraw);
        canvas.addEventListener('mousemove', draw);
        canvas.addEventListener('mouseup', stopDraw);
        canvas.addEventListener('mouseleave', stopDraw);
        canvas.addEventListener('touchstart', startDraw);
        canvas.addEventListener('touchmove', draw);
        canvas.addEventListener('touchend', stopDraw);
    });
})();