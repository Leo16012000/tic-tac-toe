$(document).ready(function () {
    $('.switch-mode').on('click', 'button', function () {
        id = $(this).attr('id');
        switch (id) {
            case 'createRoom':
                $('.main-container .content').html('');
                window.location.href = "/";
                break;

            case 'findRoom':
                $('.main-container .content').html(renderFindRoom());

                break;
        }
    });

    $('.content').on('click', '.virtual-keyboard li', function () {
        $("#idRoom").focus();
        $('#idRoom').val($('#idRoom').val() + Number($(this).html()))

    });

    $('.content').on('change', '[type=text]', function (e) {
        $(e.target).val($(e.target).val().replace(/[^\d\.]/g, ''));

    })

    $('.content').on('focus', '[type=text]', function () {
        $('.reicon').css({ 'display': 'block' });

    })

    $('.content').on('click', '.reicon', function () {
        $('#idRoom').val('');
    })

    $('.content').on('click', '#goRoom', function () {
        window.location.href = "/";
    })
})

function renderFindRoom() {
    return `
    <label for="iroom">
    <input id="idRoom" type="text" placeholder="Nhập số phòng" name="iroom" value="" required>
    <svg class="reicon" width="25px" viewBox="0 0 510 511" fill="none" xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink">
        <rect width="510" height="511" fill="url(#pattern0)" />
        <defs>
            <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                <use xlink:href="#image0" transform="scale(0.00196078)" />
            </pattern>
            <image id="image0" width="510" height="511"
                xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAf4AAAH/CAYAAAC2M7+AAABCNUlEQVR42u2df4SVWxfHrzHGGGOMMZIkSZJkJCNJriRJkiS5kiRJkiRJrkSSJEmSK0mSJEkykiRJMpJkjCTJyBgjGUmSJPPu1f2e+56m+XHOmfNjP2t/vnz/eb333nnOs/b6PHvvtdf+4w+EEEIIIYRQXBr+44/24JnBS4KXBW8J3h58OPhk8KXgW8EPR3FvcF+Bfjzin72vf7f5YvDR4L+DtwZv0N+yIHhGcCNvCiGEEPoV4HUj3Bg8J3h58DaB3AD7IPht8FDwj+DhjNj+1v7g13oGe5YjwTuCVwbPC24d+TsQGQghhLzAvSF4bvCa4D3Bp4KvB3cLkFmCejk/Dj5qJeJe8IXgg8Hr9GHQxEcBQgih2AFfHzxNs9q9wZeDnwZ/SRDsk/W34B59INlqwV/aTmjR78xHAUIIoapAvl5uC+7U8vVp7YMPJjp7r/YHwavgm9oSWRU8Ne+98CGAEEJoUjP5ei3VzxPkrcDtpQAEiOP5GLB6givBu4MX5a0M8DGAEEJowtl8c/BC7cff0D78dwCbKX8KfqLVmE3Bs/UBx4cAQgglDvoGVZgvU3FZV/AHluzdrgpcUL3ADD4EEEIoDdg3aBn4TxWNPdLsEDim5a8qHjwTvFZFmXwIIISQk1m9nZOfrpnelYSP0OGx/UXHK48Fr1Dx5s8PAUYSQghlY1bfpKr7/Woi8xm44SJ6DAzqI3FjriMhqwEIIRQP7HOz+ilqknNW+7lU3uNy+KNqP3apw2KTPi75CEAIoRrAfoba3N6kKA9XaUvgiQpBO1UvwkcAQghVGPbTdDnMDfWxB0i4lt0FD6mrICsBCCFURti3axnfjmMNMLPHkfmzbjK0Jk+z9BFAYSBCCBUI+9yNdbnz9XapzRua6OCM+IPuGFivdsKNfAQghNDosG9Q17xOnbHvoUAPZ/x0QJ+KTZfrQ5atAIQQS/laFp0ZvFOFU9xmhz3WAzzXrY1z2QpACKUI/FwHvaXqp/6OfXuciN/rsqcVrAIghFJYzm9SVf7m4Hu0y8WJtw3uVn8ACgIRQi5n9wu0d/+a2T3Gv9QC2IrXORWz/mwXTOZACGVxdp/rpreWM/cYF3ws8IFWxKZpDLENgBDKxHL+HBUyPacyH+OibUdXXwTvVuFrEx8ACKEYgW9H8Tq0nP+G5XyMy7IN8EotgudqjPEBgBCqKfDrtX9vwD+uvUoSNsaV6QlwXGOtmUJAhFCtgL9YRUmDJGeMq+IBNQVarOOAfAAghCoO/Fwr3QsAH+Oatga+rLHYwgcAQqjcwG/QMaPlSjZU6GMcT0Ogf7QCwAcAQqgsM3wD/mrdeU/DHYzj3QKwC60W6gOAIkCEUFHAr1PyWKL2oszwMc6GrQjwWF4RIB8ACKEJgW9nhudTpY9xpk8BvAw+kHcpEB8ACKHfoN+onuF7dCUu5/Axzv4HQI/GtI3tRjIdQihXuDc1eFPwIzrtYeyyE2C3WgFP5S4AhNIFfq5wb6V66VO4h7H/uwBu5F0JzPI/Qgnt41vh3iI133lPQsQ4KfcHn6AAEKF09vHtAp2/1U+fJIhx2vv/O4NnsP+PkM9lfbsid6P28b+T+DDGqum5q+uz22kAhJCfZX07j3+R8/gY43E6AJ7TFiDL/whleFl/dvA+Xe1JcsMYT2Q7/787eCbV/whla5ZvS3brgu8FfyWZYYyLsOWMWzrxQ/U/QhmY5ee67g2QwDDGk/BbFQLPpfgPoXhn+euDH1C8hzEuY/HfPa0gUvyHELN8jHFCt//lzv43kXkRqu0sfwOzfIxxlc7+P1F776nM/hGq/ix/rmb5gyQkjHEVbceCzwZ3MvtHqDrQb1G17W0u1MEY13D2/zj4L608UvmPUAWAb933pgXv4lw+xjiivf8jVP4jVH7oNwUvVGctbtHDGMdW+d8VvEorksz+EZoE8K2Ar03H9B5qeY1EgzGO0bYSuUeX/tD1D6ESoN8QPCv4YHAfSQVjnAF/0r0gdj9IM5kcocKhb5dkLA2+EvyFZJKUv6tl6idVT7/XyY136qT2WrbZVe8Ivwh+Pkn35P37XuX99/ryPKC/6b3+xo/Bn/V3f2NlCgd369jfFJb+EZp4ad8GyubgpyQP1xXRXwXNfgH9pcBtPRluBP+joqm9wTuG/702dYWOUFm9xzwVe+a7qQwx2J7375uv/5b9N1cHr9HfsV1/k10AdTj4VPD54Ova67Vq72d6nl59OLzVsw7quT9zKiWJG/+OqfCPpX+ERkm4jUrmxzRgSBx+ZvCf9E77BPhuQfJo8Jbg5cFzPC2N6iPWLniZrg+HVZoB7laM23LwHX0g2MfBG30YfNAqF6sGfgr/rmoFkzP/CI1Y2rfkf5NZkAvI9wtkuRn8Wc2OV3Ps6bfYt2OqdgXsMq10WU3LJa0a9OpjaYhxkXnb+9yoYmWW/lHyS/ttaoLRTXLI5GxmSHAySN0PPhO8LfhP9jcn/UEwWy2pj2l1oIcPgczf9rdPVf+0+0XJJrbp2sN9S1LIhL9oyT43m78lKG3QUj37mJUdL7P4EMi8rRD0tC77YbygpJJYg/bzT2hPk4QQ79L9kD7MrNjympaiV6n4jVkLHwK4tJWy61oVY98fJZGwmlTocpXkFO2sfkBFeHdVgLeGfuSZ+JgeuTXQq3f5lbiO0g80tlqIYOQ5ObUo0B9QtRzV0bqPmtXbOfbLqjzvpAgv8x8CHeokd0OrAQP0xYjOL3SypY2oRR4TUZuqlp8z2KOA/ZDOl1sr5JOaKU5n+d7tR8B8fdBdEWz6+QiIquhvj7bPWFVDLpKOVe5PVWC/YZDXFPaf9A4eBR9XQxyWGdP7CJijBkRX9CHep4ZCjJPa+YO21Wbz8Y2ynmRyBUiHacpTM39WYu/W7Ybr2K9HeR8Bs7USd1EFnHwE1HasnqPiH2U9qXToXDeJpLr+qv3c52oGs4Wzw6iAj/SZipWLip1BnexgTFW34v+SamyAP8pUErH2u4u0lEjlfnWL9F6pA+IeeoSjSXy023HbAzrZ8YaP96qP5es6/USBLcoM9JcqcKncr84MYUBL+We0b891oKhc47ldhZ8XVBT4nlWAqsG/S63MOeuPok4STQrULqBflf3A1/qt9zK7R1X4oLebCg/pOO5bTgVUxfd0xwUf8yjKxNCsjm73GKwV7aT3XvuvF3KFekQfquI4r9Oxs81qwtWjinQ+9CtnW81bzwkcFCP01+qYGAO1MsDv10zLZlwL2PtDkazwLdHRUBv776jpqZif6VrnViIPxTD4W7QHyO16ldm/f6dVlL2qzOcYHopxFcBic6e2nvr4AKiIX+rUBfBHNR3wrQrEHgZl2Y/j2R7qbTVamQ7wUUZygm0DbOcDoOLwbyMnoFpC/yWDsawX5LzRiYit1vGQSEMZ/wC4rQ8ALgoqL/xtQjAF+COgn+0K/Ve69vYvCvaQoy2A3AfATX3U8gFQHr/T3QvAHwH9DC7pv9GNeGvZu0OO80a7itOu8wEA/BHQT7VK3wbtLR2LYoaPUskhU/gAAP4I6KfWjWtQVfq7KNpDfAD8/AB4SxEg8EdA3+u1m3bW+W9di8oAReSWf2G1TXcCDNIICPgjoO/BH9V847hantJWF6Ffc0ydWk4f1lj5RN4A/gjoZ7X5jvXS/yf4Ty7aQGjCfNOosXJeY4f9f+CPqjwIrQ3vRqBf8j5+l/Yw24gmhIrKPe061npbN0+y/A/8UZWgv542vCWdx3+mJcu5DDqESs5Btvw/O/hg8GNtmZFjioP/TiYeCOhX9nieVSZfCl7Bsj5CZctHDcGLg89q9ZGrgAv3K3UApT8IGneQNamRDNAvrlr/vlpoTiOKEKpIbmrThOS6ZrMs/3OxDyoT9FcGP2SwFNxX3y4nOqFrcuuJIoQqmqNs+X9m8L7gJ9paIxcVBn9rFNZCFKH8AWXVtMvVWIaBMrHfq/f4Or6kEapJvlqmVtf9zP4L8gtdn95MBKHcHtoSVaEzQCbey3+tWf48ivcQqmnustn/ARXUsvc/sbu1lUsNUuIDpz64I/gKX80T+pO2QbbSWx+haHKYFSOv1t7/IHlqQj/Sli7wTxj6c1QtS5/s8c/l96tifymd9xCKLpflOv8dDe6l8c+EvqetkkaiJ72BMiP4GAUyE16b+0L99WcROQhFnddatY/dpdM25LCxfUtbvExkEhog1tFpP4NjwmN6XTpCRDUsQtmZ1Ngpm1Oqx2E1c+yVTNse6QT+aQyMNnV0ekfwjzkgrBnPaV2qwzE9hLKX59pVj3Ofrn/j5rpLKlQmzzkeDM3qgU3//bFb7j7Rh9FUIgahTOe7enX9s4uy+ihgHvMysdM6IcEpJYeDoEnVr08J9lFtFcFX1XKXoheE/OS+6Wr684Kl/zFPLP3NZMdf4DeoIv0+QT7qF69VAh/hYh2E3ObAFq12PqSgeVQPaKWThmSOlrvmazZLgP/qjzrawvW5CKUxAVquojYKm0e/1Gcj3f2yH+h1WuY6xRLXb0Utfdr7W0xhC0JJ5USr+j/DZT9jdvdbyXZntoPcKvj3Bg8R0L+03e3VccbpRAlCSebGGWr328uk6DffCV7EMb9sBnaugv8tgfzLfr4VN25jaR+h5HNkq26tY9//9xXRi8GzqXnKVkDnbtvrJoh/uUb3IXtYCKERudJO8txgZfS3fHnYmr0RJdkI5HrtYd0keH85rtKl44zsXSGE8nNmnZp1naWx2W+V/tvoXJqNAJ7JxTu/eEgnGpZSxIcQGid/Wu48qAZn38mdP/2CYr/4A7ddgfuJgP2vKc95fc2zV4UQmiiHtmmW+wz4/+curSIzcYowYJtVqMJS1b+23+GkNeUhOhBCJeTSbq74/e8k1FlOQcUXqA26X/kZQfqzIvW1WlDOIDoQQiXk1EbdzPkI+P/X7GwH+/3xBKjt688JvkZw/vwy7QneTTUqQqgM8F+j7p5fyK8/c+syzvfHEZztOnaR+lfpVy3NbaHfNEKoTPm1Xsf9blM79dNWKD2LmqnaBmWTmvT0c53uzwuIbGmuichACJUZ/n+qx/9Hzvf/vOmQyVWNgrFBfeYfs/f0xy0dOWEJCiFUiXxbp3x7mQt+/ngTvIojfrUJwplqq5jyJRMfNBCXcNQEIVSFvLtAR4Tfc8SPa8yrHYCtumTmU+LQtwHYQfAhhKqYf+frdr+BxO89OWI1ZkREdYLOKk3XJn75zn/QJyIQQjXIw7PVJyRl+Perrool/woHW64P/32gD/QRQsC/xn5AV7/KB9qU4NMJ7+sb9C8AfYRQRPA/nfCev7HoFH1TKhdguaN77xOu3r9iffeJBoRQRLl5vlYhU632f68WxxylLnNg5Zb4HycM/Ws6TkMhH0Iothy9QBOTVM/5Pw1exJJ/eYMq5SV+oI8Qij1H587531BDsRSX/G0bdhrRUJ6ASnmJ3wbQTaCPEMoI/JfpjHuKvf3tePlOu92QaJhcIOWW+J8k2nv/ngYS0EcIZSVnr9TJqxTvT+llyX/yQdSu4yKpLfF/18fOWgIIIZSxvN2g3PVYjW5Sg/85qvxLD57cfdADCe4V9ahKlMYQCKGs5u+NKnr7nuCxaxr7lBA0tlc0L/hhgl+Lr4N3c/sTQijjebxZ14T3JLhqe089DtimLSJg2oJPJPil+C74EMtECCEnubxFBW+vEqzR2kuhX+GBYvtDq4MHE2wCYR2gZhIFCCFHOd1qtf5Wb/uUcvorCv0KCxBb4p+h4yCpndW3M6DziAKEkMPcbteonw0eSiy3/8MNfhMHR7OWhVI6BvJFZ/U7iQCEkOP8vlC57ktihX7rKPQbOyjs/Gdn8IvEju091rlXikAQQp5zfJ1y3ePE6res0G8WOX70oGjXUlBK1Z8vVfXK1yBCKIU836ic9zKhPG+9DPZR6Dd6MKxNrC2vVfAftBMMRABCKKF836bc945Cv7SXf6zw425CQTCk1Y2ZRABCKMG8b0XcZxK7ypdCv7wAaNZ5x2+JFfMt5O0jhBLO/XYPy/WEbvMbotDvj/8K+hYl1NyBYj6EfOe0BvZyC/6tbLV3RfCjhCZ+97XCXZfyi2/V8kcqPfh7KeYrS7JYoHaYDfwiKKLYnBq8VUeSWdIt7Ddr1L0kvYkUdn9LuqOfvoyXJbTHM6B2vBTzTW6FaHnw1eCLwUuAP4oI+vt118ZrJXfgX/gE8EBCxX4vdRdNXYovu10JPIUXbXtYl22WyjCfFPRXqwj0s5o83dKHQBO/EIoA+m/yVveAf3G/4QxdZzuUyOrvweRm/Xn9+D8mtK+/nOE9aejfH9H165uaY6wA/igS6A8D/5J/y0Ua4yns91tsdCQ167fb5zRbS2G2/0Z7fuzrlxYrtge4QVc0fxnjwwr4o5igD/xL/8DfklCx99FkZv15ifxTIsc37KzqVIZ1ybGyMbh7gllADv6rqahGkUAf+Jf2u9oW8MlEar/eqlC5LoUXO11JOoXqzTuc158U9P8qAPr58LdjQeuBP4oE+sC/tN+3Qze0pnBZ2zH3+UrJfGsitzP1arZKi8bKQz8/wT4B/igi6AP/4n/jOq0K9ybAiT7XrXz1MmcoMadwdO+wHVNhGBcdJy3Bm0qAPvBHsUIf+Bf/W7dqD3wwAV5Y+/YWry+ySUVu3is2v6gN5RyGb0nQ3x78fJJxAvxRbNAH/sX/5nODbySwQmwTxcXuZv15F/G8SODrzZ5xDS15S4Z+T5nu6gb+KDboA//iubFGE4EfzPqz9wIbldS/O395tix1BNDUHPr5CbYb+KNJxOYUQf9tBZq4AP+Jf/9mNbvpT2DWv8TVrF+V/N3OX1yuk9xchmsU0B8J/7/c7qOhrEEf+Bf3Hmy1+EoCt/hdcpOj8i5h+JZAFf8Glvijgn5+gn2uEyUUXKIYoA/8i3sfy/UB73nJf0j319R7GUAPnUPfmk2cACpRQj/f9t/axntCkUAf+Bc3gdyXwEU+VzI/61dP/g3OqzK/6eKYDoZn1NDPhz8zfxQL9IF/cUv+N5w39sn+rN+uoBUUvV+2sJlGPZmAfv62DPBHsUAf+Bf2fnKNfV46Z8rlzM76827g81yQ8VHHMBik2YE+8EcxQh/4Fz6ZPOf8ZlfbOl6YyXoxdV667fxOZTsnvpjhWHBi3S3gfo+oIBP4E5uxQB/4F/a+liRQ6Hc8c7eN6nrFZc5v4LNzl3/bygZDsaDEuk/JLLbBCvyJzZigD/wnfmeNyr2e2/laPM7K1KxfTRcuOS/o66Itb+ahD/yJzRihD/wnfndzlIO/OV5R3mUfOVl5IVaAMd/5fcpvBArO7Gcf+sAf6McOAOA/Ome2lrGNcox+lpl3rmWYA45fxmdVXU5l+LmBPvAH+sA/m+/xkuMCclvNWJeJ7WQLTOeX8VhF+iqGnTvoj4Q/7X19xmZ7xqAP/Md/nyuc86Yr+lykor41jvddrLnCKaDgFvrAH+gD/2y902ZVwHvdWv4U/eU9egnXHBdbPA7uZLi5hn4+/Lez7A/0gX/077ZDbeG93v56LtqjfQkU9Q2odoHje/6hn/MrJdg23rAL6Pc5moQA/19Xmvc47uNv7JkbZTG586I++5K8Z+cqSaPJQD//PO0+4A/0gX/U73m6GsZ53WbeH+XRPg2wHqc/er8GGMf3xob+G8edtIA/0Af+cb9rW3He4fhdv4zuJJnzor7vumiI2X6a0Af+QB/4M+uP4T1vimqrWUV9150OLEscO5ntJw194A/0gT+z/lr7YTQnjfRjL3Ba1PdNX5DTSKfJQz//QxD4A33gH+f7n+Z41v9Fd+DUx/BDW1HfIcdJfjuzfaA/Bvw56hdXbLYlCn3gn86s/2wURX4CwUuHP/DX4JvM9oE+8Af6wD9zs36vF/j01fy9qqhvg9PGCQa3zcz2gT7wB/rAn1l/RO92XU2X+62bUPAtp7P965yPBfrAH+gDf2b9kflKzTr55XXq++g0mW8lrf5XLAX0gT/QB/5Zm/XvVg8Wb+/1ffCMmqxG23lCBZTXLn3TSaxAH/hHD/13xB7wHyNGZgbfd7oVvbUmy/1a5n/otC/y/tT39oE+8Af6wN/BrH+v01n/naov9+sHnR382eEAeRI8B+gD/UnCnyt9gT7wZ9ZfKX+s+sU9Wubf6XBwWBOiY1HffQz0gX+6sdmqi8CA/uTgvycV+OfN+gccvs89VW3hq2X+ew5/yBfBnUAf6JfB74B/2aG/B+gD/xJiZ5ZWcr3ltO6qLffnLfN/cvYj2vP8E+XVh0Af+KcN/WZ10HxLTAH/EuLH+s0cDx5yeOx8YVWW+/Ujbnc4GF4FrwL6QB/4Rwf9bQIV8QT8S42jP4N7Hb7Ho1VZ7ldv/lsOv5yup5icgT7wB/rA3zv8FUtXddGNp3fYW5VTRGocMOQwMW9PNLlODT7tcEAAfx/Qf0PsVPwG0nMp9C0Jz7jFYbMne3/LK7rcr2X+LQ6/eh/ZB02iCdZOaCwOvqGVD5Jh5eHfDNqBfiTNyu4IHI0JxJW18X3g8GjfuYou9ztd5s8d4atLONECf+AP9IG+99iywvTDannrLae0VPKHm+pwmd/2SJaScIE/8Af6QN99jFkVfI/DVes/KzJ5Hf7/FbyefjDb175GAgb+wB/oA/0k4sxWrS867Dp7tCKN5wSFaw6T7zbSLvCvkfuBP9AH+lWPt/UOY+1pRd6plvnfO1seecItfMAf+Nc01pqAPtCvcszZEea7zor8bPV6VqWW+T2d87ZahZOp38IH/KOCf1Oi0KcjH9CvduzZRU+Dzt7zlrIu9wsC5539SC+DlzEEgH9E8N+fCvyBPtCvcfzZzXbPnL3rq2U91qeCiFfOOvXdpLCqKPjfBP7AH+gDfUd57ZyzO2cGy3asT2cf56tDkJcfyK5o3Ev4A3/gD/SBfrJ5bZ2z2pLyHetzeimPXb87n9AvGv6LgD/wB/qZgL4Vry0D+uPGoxX5PXZWu1aeY31K+FecVT9eZUAA/wysSrmBP9AH+hHGZJ3uKfno7FhfQ7kGbL+z2dQOwh74Zwj+jRmPmUZBv493CvQji80Nzj5GJ3+sT19EC50thdgy/xxCHvgDf6AP9JPPZdafptsZ47ZMap9f+/t7HP0gn9WusYGQB/7AH+gDfZb7HVb3X5vUPr+S+w1HP4gloM2EO/AH/kAf6CPF6kZncTo4qaPqdibQWZtea9gwg1AH/sAf6AN95HS5v/RjfVoCWezox/ikJZ16Qh34O4B/A9AH+kC/bMv9/zhb7j9SKvhtf/+As2X+jYR5xeF/C/hXZSkvOvjnQf8d7wjoZyx/bXYWt/dLmuQK/F2Ofojnw9zEB/yBfyXfPdAH+lnNXTOc9e4fKik+wj/Uqn/YU9MelvmrA4BO4J8O/IE+0HeQt+p14uuzo33+jlL2PJY52xfdQ3gDf+BfkXe9FehXBfr3gD7L/UV4e1H7/AL/IUc/gF3Bu4jQBv7O4V8P9IE+mtRy/3NHcfNPseC3ZY8HzgYNAwb4A//yQ7+f3x7oO1ruv+Rouf9pUflA1bleLi6wOoXjhDXwT8DvqwF/oF916P8J9KuWr/boI9pLbVtbMQ8/19H5fbuAYR0hDfyBP9AH+miC+F4a/NpRHC0tZn9/o7NufVMIaeAP/MuyFAr0gb7nPNXqrIvf/oL2+QX+Y44u5bk0qZuKULnBYfC/DfyrBv86oA/0UcFxXufsWN+1QsFfr8Ts5RjfTsIZ+AP/skB/gN8U6CeQo3Y6ivW3Ba38aZB7OZ7zimN80cJ/IfCPH/5Av6rQvy/oc214bfPTIrHDS1xNK+Shp+r/7KFzke3VtBDKwD9xfygF/kAf6Ceam5qCHzva519TyP7GSkf7+xfZ3wf+uHj4A32gn3huOu9on//ouONe4N/nqKHJbkIY+ONf4H+gwAInoA/02ef3EWf3CgH/FScPa2cx/ySEMwf/bwChdvDPg/4gvxXQTzgndTra5/8wEfjrHfUqflZU1yIUC/y7gH9t4A/0qw79pUA/6n3+J072+e0ZZo/3sC1Ollu/aOWC/X3gj8fZ8wf6QB+NmY/OBn9yEnerxnvQBY729/cRusAfF1bwB/SrBv0HQD8zuchTw6rd4+3t7XDUtGAloZtp+C8A/lWD/2Wd9+f3APro/3mow9E+/+lRV8AF/tNOHvJFcDuhC/xxwVtj/A5AH/2ag+x+kUdO9vm7xgP/QwcPaDUKN9nfB/4YA300yRx0zsk+/9vxwD/k4AHtGY4Tsu7gfwf4Y6CPqpx/djupffk+6v0PtjTuZEnDijG2ELLAH2OgjyaZe1ZqtuwhJueO9oALHTXu4WIe4I9xLaH/EOi7yDvTg3vd9uwP/+N6R4V9NO7xC/8O4I8zAP0lQN9NzvFS4Ld3tAfc46g5BoV9wB9joI/KkXOuODn58s/IB7PCvlMOHuzTbw+HgD/GQB+Vnm8Oqd9F1mP04Wjgv+Hgwd7TsS85+N8F/hjoowrmmi1OOvj1jwb+Z04q+v8iVIE/xjWAfj2j0mWeWeakst/qFJpHgt/DUsYbq6QlVIE/xlWC/iOg7z7HzAl+6SRmF+Q/WKuTqkV7ObMIVeCPMdBHZcovTTot5iFuN+Q/2DwnD/WcPbak4T8f+GOgjyqQX+7rvWc9dg/mP9RqJ/sXTwhR4B98D/jjCkN/MdBPKrfcdpJTzuQ/1C4HD2QvpYsQTX6A1gF/DPRRmfPKheDPDmL4Uv5DnXBytegVQhQBf1wh6D8G+snmFOtz89FBHD/If6jrDh7IvsbOE6II+GOgj8qcT444ub32ef5DPXXwQPY1doIQRSPgPw/4Y6CPJplL9qpBXNbj+W3+Q3l4IPsaO0yIojHgfx/4Y6CPSswjO4MHPdTC5T+UhzP8H345qoAQ8MdAH5Unh2wNHvAQ27kHancyUO1rbCchioA/LgP0nwQvAvpI+WNt8DtP4J/pZLDa19gOQhQBfwz0UZlzxxpv4J8L+FFi8J8L/DHQRymDf5mTQWs3820hRFER8H8A/HF+50+gj8bIGSuc3NDnDvx9tg9DiCLgj0uAfregX8foQKPki07d/uoG/H85Av8aQhQBfwz0UQXA/9oT+LcCfgT8gX/C0O8E+ig18O8G/Aj4/zEn+CHwB/oIpQD+I4AfMbCBP9BHCPBnrgexVV4Sogj44wmg/xTooyJzQ4c38F9yMqDtpXQSoqiM8P8OKIE+QiFepgX3Av44wb+QEEVlhP8j4A/0EfII/luAH6FR4T8b+LuC/kKgjwD/vw/0EPAjNOaAB/7Zh/4zoI8A/6/gfwz4EQL+QB+hdMDfB/gRKgj+j4E/0EeAH/ADfgT8caTQJ2oR4Af8CE02AcwC/tFD/zm5AAF+wI8Q8E8H+guIUgT4AT9ClYD/E+AP9BHgB/yAHwF/DPQR4I8a/L2AH6GSE8JM4A/0EeCngQ/gR8AfA30E+AE/4EfAHwN9BPgBP+BHXpKD7fn3CErAubJ+xXhHgB/wA35Uy8Rgl/psDR4EylXxh+D9dOVDgB/wA34E9NPxe+CPAD/gB/wI6KcJ/3qiEQF+wI8Q0Af+CAF+wI9QWRJBPdAH/gjwA37Aj9KC/gDABf4I8AP+2oK/kxBFQB/4A38E+McH/z0nA/5t8DJCFAH95D0o+DcQtahMY3+ueke4Af8lJ4PdLhtaQ4gioI+BPyrz+O/UqrIb8J8G/AgVBP1+gAr8EeD3AP7DgB+hMQd8A9AH/gjwewP/VsCPENAH/gilA/4NjsC/lhBFQB+PA/9GohuVCP43nsC/zMnAtgT9FyGKgD4ewwPAH5WYE5bp5Jgb8M91NKh3EKKoTNB/ByiBP0LKC2u85ITcA00D/AgBfeCPUCLg10P9cLKHB/hRqQO7EegDf4TGyA9rPYL/g5NWnfsIUVQi9LcBfeCP0Bg5YpOXmp/8h/JQtGAfL4cJUQT0cQnwb2I0oHHyxA4nN3H+yH8oDxf1DAUfJ0QR0MclwH8f8Efj5Io9TsA/lP9Qtx080Ofg84QoKhL6fYAP6+NvD8v+aIx8cUSTy6zH+fP8h7ro4IG+BF8mRBHQx5O44XML8Eej5IzjwR8dxPjN/Ic66uCBvgV3EaII6ONJ+A3wR6PkjQtaVc56fJ/Kf6gDHooWgh8TomicwdsE9DHwRyXkjhvBXx3E9p78h9riZMA+tytUCVME9DHwR2XMH/eCvzuI67X5D7XEyWDtDZ5JmKIxoP8WoOES4E+1f9r5o0GTSg8xvTD/waY46d5nA3UJoYqAPi5jTtkK/JPOIbOCXzrZDm/Lf7A6J9377EjORkIVKa4bNWMD+hj4o1LzyFInV/J+HPlgBv5uJ/369xCqSNBfq+0f4IUn69fAP9lc4qVd74vRwH/FwxdN8GlCFegHrwP6GPijMuSTg05WxG+N9nCHHTzY11EfDgF9jIE/Ki2nXHRyhv/MaA+3wdGRPgYl0AdSGPijyeaUOt1l4+Eo3/7RHnChk0H5Kng+IQv0MQb+aJJ5xU689TiJ2Q2jPWCrkyN9VoSxiZBNEvo9AAnXAP7NjEK3uWW5o1NBnWMtaQw4eDgrwjhCyCYJ/R/ACAN/VMb8stPJdby2VTFlLPA/clLgd52QTWJQNgF9HMn2IvD3mWPOBH9yshJeNxb4LzgZiM+CWwhboI8x8Ecl5ph6Rz3674wH/v2Olt9o3Qv0MQb+qNQ8M8tRsfCJUcGvB13n5CFtT2Y3oesa+i+APgb+qIK5ZoPawHuIy43jPWiHk4e0ZgsXCV2gjzHwRyXmm6PBQ04u55k33oO2BH9z8qCPOWPrDvrrgT4G/qhK+/u3nfDQihMbJnrYV44GXichDPQxBv6oyJwz3VFfkO4x9/f1sF4u6xlWT4IdhDDQx7iGfin4c8ooW3lnTXCfkxg8Xwj4dzl5WFveOEsIA32MgT8qMvfYjXzvncTfrnHBrwde5ORhf+hyhUbCGOjjccfJOydnlYE/KkfusQnwDTWD8xB7Swp56GYnVxDmBtsCQjmz0H8O9CsOffuwWqtiWOAP/Mk//17M88JJzFlxYmshD20Ffk+cPLS1KdxGKAN9PCr0n+c+jNWsBPgDf3LQH3+sdnQxjxWY1he6zHHK0T7/uQn3NxDQTxj6eb//bN3XAfyBf8p56Igue/MQa9cK4p/Av9lRgntc0FIHqvVgawb6tYM+8Af+6Gf8NwR3OTm/b/674Ilv+D/OdZR8rW//CkIa6OPxoQ/8gT+56Cf7eh3F2OpiwN8w7OMO4mEt2RwipIE+0J8Y+sAf+Ceej7aqNsxDbNnYnVnMw+faFXqparw9bstCBPTTgP7CIt6NbfnN0ZHYb/yGFXUv8I8iH9Wp2Y2XU23vCirsG/EDHHY0sHrGvaQA1RL6z4B+xaH/rBjoA3/gn2hOalVNmJd8dKUU8K92NKj6ad8L9IF+ybMg4F9d+FOMXJu8tEw1YV7iaUfRJ9p0SYGXgW5LNxc41hfF4LIbIDcA/fihD/yBf2K5yVOb3m8lrXKrwO+1oyRoTYnaCe+aL6VtYk+/etAv18cu8Af+znOT8e6Wo9h+XVJdmwr8rjoaTG9s+4IQryn0t6uKmeReWeg/LSf0R8Dfjjs9AP7A31l+mu/sGN+Fovb3RwzyXY5+iI/qSMhyP9D3Dv3OSsU58Af+TnPUnuF/r3L3EjtbSsoBGuAdjgZ3rosfy/1AH+gDf+CP8pf5Pd3GZ88xe7I/yCtny/1rCHWgD/SBP/BHiuUOHfn2dHy9YTI/iO3zn2G5HwH9qKHfXU3ojwL/+8Af+Gc4V+131KnWfLak/f0RA3uNsyRpy/1TCHegD/TLBv95wL9qM7ltwW1kmbLFb5M6u3qK3Q2Tzge2Jx485OhHsXuWNxLyFRtIbUA/DegD/5r19t9JrVLZYrfTWTX/F+vBU67Chy5HP8yn4HMs91cU+r0k6KpAf1EscQz8q16rtBf4s8w/ip+W5V4a7fPvcZY0rZnPNMIe6Gf0xq0nMUEf+NcU/mxbssyf75OT2t8fMZg7nP04LPcD/ay24XwUI/RHgf894A/8I89bSx1uSa4pW24I/6JGZz9Qbrm/nvAH+hmC/l1V0ddFHhN16oQG/IF/zDF6LPiDo1j4XNY40D7/GWcDxnqZz2EIAH2gD/yBf3K5a6pWzzzdGfKwLPv7IwbxGmc/krVn3MsQAPpAH/gD/+Ty1+bgPmcx8HfZV7F1rO+Ds4TaRUMMoA/0gT/wTyp/2db1ZS2Ne3n3XytxMVfux+pyNlBe08IX6EcO/XlZP3qqk0Hz9TzAH/jXOh4XOGvRa7arzhsrNXj3OPuxPqq9YQPDAehHBv07HqAP/IF/hLFoS+Lvnb3zQxUpVnd6rC/X8GAuwwHoA/2qwL8D+AP/GsZgu+Lvu7OcUbkOnmp44G2JhCI/oA/0gb9Hvwb+v8XfOn0UeWvj3FzJH82O9R1xmGwp8gP6QB/4A3/fcWd1ahfUx8XTOz5e0e1qLfd36iIAivyAPgb6k4X/HeAP/KsUc50OV6xt7CypeN7Qcv8TZz+efQH+U5GqyOxDv4fEWZUVp/mpXRwF/IF/lWPNW6e+YU3KmqvxAzY4rO7PHYfoBPlAv0bQr084IQN/4F/pOJsd/NhZEzrziaqcStNy/xyH+yQf9EVYD/SBPtCvOvwXAH/gX8EY26tCbm83dS6v2kqhlvvvOPsRc3eczwX6QB/oA3/g7ya2pjg8wpc7stla7UG6xeGyyWDwgdT2WvVO24E+0Af+ycF/agJxtWn436vYvb3D01VtPqfl/hkCpbelE+spPgPo4wpB/zbQLwj+XcAf+JchnlqCrzo8ifajqsv8I5b7rzgcDO+CdyaUaFu0egP0qwP9DqAP/COD/y7b5nMaSyvV4MYjp9pqNTjXOlzut0Rzy2bBiSTZacGnHBZrxnZzFtAH/jHaZsLnrerdYQw169k85rbzNTt+rqIJj3snVjSxMZEEW6cGEDeAP9CPEP4LgX9FoW/1FCs8xqaWwnudrh6urtk7UwvEM04HxJVU2vgCf6AP/IE+s/3MuKembNKgXO50QL6yrYyEEizwB/rAH+h7iZkVjluNHxiu9VXy9uXhtDDsc/Blr0UvwL/i0L8F9CsC/9v6fYkzoJ/ibH8oijs9tNx/2HHF64bEEizwB/rAH+gz24/T1+1EXSyg6HQKia/6oduBPy4C+guAPvAH+sz2K1DUtyaa96cf+7bTAWMV/psSTLDAH+gDf6DPbD8eP4tq6znvTP83x7P+KcCfJAr0gT/QjzYmWhzP9ofVZbEhth/d2r4+ZdYP/IE+qiL8O4E/0Fc8rHHapc/83i6Qi+4eGfsSCd7hsJNf0rP+PPgvBf5AH/gD/UjjYKrTnvw5X4qiqG8MOMxw2slvWM+1NcWb+4D/mNC/CfSjgv8t4J8k9C03bXPMHovpVdG+S13cc8zxJSvWQGROwgkW+AP9WGOzAfinB329+9nDvq9yfhb1yTKBwZLhB6cvwK4h/ju6AgvgXwvoLwT6wB/oR/HODwYPOH6ve2t2IU8RL6J52Od1vbk7kJ8EL0o8waYKf6AP/IF+XO/bxuJjp7Vlucnm3Oi3mLXftsJxkcXH4LOpXOAD/IE+8Af6EU8yT6qNrdd3a0V9zVl5IW3BDx2/jJcpXeAD/IE+8Af6Eb5je+YXzvPOqsy8Vw26zY6XX77o6Mh0Eqx7+AP9bMN/kWP4pwz9abpE7bNj8D/JXLt4g6Lj1onmvuBdwMA1/IE+8Af68b3TeuXePsd8+R68PXOF5Drad8D5i7lnVySSXl3C/6ueBegDf6Af1/u0MflAOdgrX3rUF6cuiyCwe4P7Hb8ca6N41HpEk15dwR/o+4X/zYzDP3Xotwafcl7Q9yMTR/jGeUnNqoAfdv5ltjbVjn4O4Q/0gT/Qjze3rHfcjz/n19YoLrNM0V7MEp1F9FxVa6CYTWrNPPxz0O9MuUkT8Af6kb672Q5WbArx4Sj78hf5suyqxHPOX9SAOvo1kVozC3+gD/yBfrzvrDGBDn25ovGOzK8ga9a/2PkL+6F+yitJq5mEP9AH/kA/7ve1LLjb8RHxnI9lpmEPs/6f/qxWxTNIq5mCP9AH/rHCH+j/8d/R8IsJdAj1MdsfMetf5Pzcpfld8L7MVmOmB3+gT2zGCn+g//8l/j3KrcPM9rP3ApsdX9k78hKfZaTU6OEP9FGs8Af6/383KxJZ4vc12x+R+BckMOv/pGWp6aTUaOFvyf060Ecj4L84AvgD/f+/k5naPv2cwITR32w/sVl/bsl/L1X+UcIf6KNY4Q/0f2XFAecN4PIvffM32x+R9DvUoMD7F5xV+a+msc+YcbCkBvAH+qhQ+N+oMvyB/q/5YY1yqPcl/u9JTBL1JXcwgReaa+xDL/844A/0UazwB/q//v5zNFa/JDDbf6ItjboUEv68BNou5nr5H8/c1Yr+4A/0UazwB/q//u4t6lw3mAAfrHZhUzKnwPL2b34k8HJfBW8BODWDfw76i3gHKDL4A/1ff2879r1B958MJ2C7LXJKasneZv29Cbzcb7pCcimptOrwB/ooVvgD/d9/60X6Tb4mshq8Mrm8pFn/Xud3Kucf8btgezkM76rBH+ijWOEP9H//jW2f+3zwx0Rm+9bJtjXVRG+3LT1P5EW/0/ZGC8O84vAH+ihW+AP933/bFhV89yfCgjfKTfWpvvCm4B2JLO1YPcML7WEx4CsHf6CPYoU/0P/9N7V9/b+0r59Czdd33eTanPJLr9MFDHcS+dKz/f77wX9yvr8i8Af6KFb4A/3Rf8+lyonfEmHA0+C5yed/DaTViRzfyO33X+F8f9nhD/RRrPAH+qP/jrMTuXUvP0dto6Pr/wOgNfh0Iks9+ef7p/L2ywJ/oI9ihT/QH/33a9N5/YFEcv6w4mA6q73/DwLb51mY0PnNXIHH7qT3esoDf0u614A+ihD+QH/0382u2t2aSBO3nD8EryVH/R4MdrxvZyKFfrliPzvRsJ6kUDL8gT6KFf5Af+zfa52u2v2eEPjP0cF17OQ+I7groWCwRHGX5j4lwR/oo1jhD/THHsMrVMz3NaE836N24cTCOAMopUK/XLHfZYr9ioL/VTVEAvooptxlsXlJ1/oC/d9/o0X6bb4klN+/aCWbLd0JgqMtsUK/XLHfKTr7FQz/haoIBvooNvjP1ewf6P/628zXR9HHhPL6sFaBKOgrIEByhX4vEgsQ6+x3KKlLGxBCKeT0WcFnNMFJKaf3aeWHCUqBgZJaoV/Or1Xp30oUIIQc5PJpwUcSaseb36HvEC3aiwuWOl3a0JVYsPxQIcjmZO5oRgh5zePtwft0dHk4MT+kQ19pQdOoQr+BBL8Un+jMJ/uECKEs5m9btd2uq9d/JJbDP+hOFiZvJQZPm4reUgsc2+K4F7yML0aEUAYnbRvVl/57grP9s5zZn1wA1ev84/MEg+ezKkI7iQSEUIZy9qrgBwnWaA2rKJ0z+2VaMrKLDYYSDKKPusSig0hACEWeq+t0297txM7qc2a/QgE1TS0PfyQYTLZfdB74I4Qiz9MLdPPopwTz9LAuCpvB9mx5l49s+eRxogEF/BFCMefoOZqcfUg0R7/hzH5lAqsp+K/E2vkCf4RQ7Ll5uq4ZTzU32xL/QfqvVC7A7FzoiUQrRXPwP0dff4RQRNA/pC51wwkv8c9mib9yQVanns/3Eg6yQR1xnE1EIIRqDP2/g98mnI9fBS9nib/ywWZnRNck/oU5oJUP4I8QAvq1O3K9l7a81Qu6NgXd18Thf9KKaogIhFAV8+8MLe+nDP1hnWCYyRJ/9QKvTlWkNxIPvEF1iaLgDyFUjdxre9nHdJtoyrnXGvX8yRJ/9QOwQccnXiUegFbwd0FXGfPliRCqJPRPJnh/ykhbM7kdNOqpXSC2BO9JuGFEfiDastNi4I8QAvoVvUHVVlmnERW1C8bc9b2XEg/GXHvfG7rYhz7RCKFy5Vk7SXUG6P/0fa2ukmNrHJQN6g/9jKD8WWXapS0QAhMhNNmJ1SLdF/Ke/PrzJNk6rtuNJ0BzF/l8IDh/wt/6HKwlQBFCJebUep1Pv6HVxNTz6hedJGsjOuIKVLvI53TwN4L05zFHu9dgE20kEUJF5tJGzWzvaSIxzL7+H5fpzhfvF2pH8C0C9ae/6cjJHgpREEIF5tHW4C3B3Yn3Scn3o+AlHN2L+0t1Bfv9v3ypvtUFGnOJEITQOPlzSvDu4J6E70MZ7da99XZJHBESd/Dafv9mKlB/a/RzQYU6LFUhhEbmzZnqxvdGEwby5r/HpPewXZqdIG5XIQb7U78e97NtkFUU/SGElCutcn+Bjuv1kyd/2So9pTsJmCxlKJhnaZbL1+uvlamPVPTHxRIIpZ0nc1uj1zkR9Ztvqn8Bx6IzFtR2vr9T59oJ5N+L/vbZ1yyRglCS+bFVW6IPWRn9zY91lJGV0Yx/0T4hmH8r+rNmFP+ozS9ftQilkxdtP/9gcC/Hn3/zS4r5fAR5U/AGLvMZc9//npb+aUyBkO9cWKd2s+fYzx/VduPgdrZBfS1r7STYx1z6ty//I3bkj0IWhNyufq7U3vUQeW/UCv4DdqSRaPEV+FNV6U/7ybGP/F3V1gh7Wwj5yX1TNJN9rAJf8t3vnU5PBM9g4uNzmWumrpZkX2vsPv9PtDoylahBKPM5r0M57zVNecasd7qo1U5qnZwOBGvrO0/X+HLMb/xuf6e5fhKhzOa6Zl3UdYujehMe2+ukHa//AZE75ncd+I/rDzoKuZ5iF4QyleNsZXO/WpfTb39sW2Hzn2xtpjMwrNBlKWf8C9r7eqHaiFlEDkLRT2qWaun6HRObCS/eWcWxvTThv1xffQyE8Zf++7U9spQlMYSizGfWpnxr8IPgT+Stcd2tbRCgn+hgsTP+q2nwU5A/qcuXJZd2ogehKHJYvXrtn1IBH4XLEzfo2Wg1EERP2gPHimDWBT9lUEzo70ouJ1QkydEXhGqXu6boQ/wuBXwF+ZV+L2qW0M8B1KLudS8ZHAX5vaph13FlJUJVz1cNumL7rK7RZZZfWFe+nXQoRSMHk3X326aBxEAp7Ka/nuDjOivMsT+EKp+npgpgD+nAV1Rzsj105UNjDaq24F36OmTAFH7s754+mhhYCFUmNzXq6NkF9dmgGU/h+ekgDcnQeIOrTvtmu4F/0f3+baXkvCr/OReLUPly0kxdo/2Eiv2ioW9HkadTj4SAf2Ur/7t12cUsBhtCk16BtAr0G5zLB/oI+Gfh3P8Niv8QKin/NGlZ/x9VotN9D+ijKsN/L0dlSi7+e6nK46U0y0BowpxjZ/LnBx/V8WJuEi3torEjQB9NFv7Tgg8B/5L9UUnsqJIa1f8I/Z5rpqmw+L6Oy7KsXxr0T7LNiMoF/+nAf9LL/+/VTnQv914j9F9+adNFWHZpWB/V+pOG/mwmFwj4x9f5z/b/bwdv4fgfShz4VgNzWfv4X8gPQB8B/xSO/13WZRkUAKJU8oi1CF+h8/gvBS1yAtBHkcN/ms7UUu1fnkH7ig8AlBDwrVK/l/P4ZaveP6I9faCPKg5/jvrxAYBQocBfDvA5soeAP+YDAPnOES3M8IE+Av64tA+A9dyohTKUF9rVbe8ywAf6yD/8+xiUFfkAeK0ugNsZ7CjiPDBdF1XdVOEqRXuVuWXvIHkAxTLo2zXoXzI4K+Kv+rC6r4E/z+4kJ/pQjcd+varJ9+uGyj7a61bM73S17lSgj2JKAq3Bm4OfM0gr2gdgUBcBnVY/c1oBo2qPdeulv0jdKB8HD9B4p6K2bb+d9P1AsSYEK+jZIDAxYCvbCfCj9lBtL/UvZgKoCit7FmObFHM92m+mtW5lbauoW6nzQbEnCDu+s1rL0gzc6tQBvFU7YDvTu4RVAFTm2f1ize4fKtbYv6+Ou1Uo2UIkoqwkCzvKc5cZQVW3AT5oFeBa8I7gmTT2QJOY3Vtb6auKKWb31fUjHeltJiJR1uC/VJdvkDCqfyXwO80YTukjjASCJhqzVqezMvi4Zvd99NCvia1QchUrdyiriaRRRUCX1Z+eQV2bWoBXWn05pIJAPgJQbow2KyYOCzgWK0N8rNdsvN6kaBd5SCwNuof+NM08ar4V8F7FQnwEsBq3VDFwVzHxnsr8mh/ZvRjcaRMmohR5SDT12m/+W0d/GOhxfATkrwQsZZbhHvaLdOa+C9hHZVthORE8l/4cyFviyRUM7VI3OgZ8fB8Bd1S9vUYdGTkemO3xNkV33h/XMv5L9YFg2y2uxjwHgmdQiIs8J6Q2nTvnrH98/qbqbTuy9TT4khqHLGD5MRNjy2pqOvTOLukdvtWMkpl9fO5VK24+slESCapZ1cN3KCKKvkfAgGaK9zRzXKde4cxO4pnVr1YPhzuCyQBn7aP3Y13AxRl9lNzsZJFmJhwZysaWwJBmkC+Cb6kS3JLXLD4EqjJm6vXRtVa//U21yH6rlRqW8LOxqmbvbTk1NSjVRNagSz4OU/SX2W2BPrVvvaMCpU0qUuJDoDygn6U22MdUlNeTB3ouxMleEd8pnXJi6wyxXKnb/V6QHDL9ITCkYqWXaiF8Tlc2WwOhaexjFjQOlmuP/oy2V3r1cTXEjD7TfqPb9dgmQygv8bWoW1UXhUhutgY+qYr8rWaqD3RW+aBWBpZpxacpoThv0Cx+qX6Dg/pNHug3eqPVr0+MAzdNeR5pS6yVj1+Efk+KjaogP6uOcyQOfx8Dn7VM3S/IvdQ+9V3tfV4IPqntn726c2CL9rXXyMvU6GSk52lloRKeM8Z/c1ne37VWMN+hlY7DKoi8oNbVd/WsL/Xs/fotPgN5t62zL3NxFkKF7WtOV+J8SfJI6qPgqyD4UUvb77Vi0K/l7pzfqhfESL/S0ngl/GqM/+bbEX9bv/7mQT3DkJ7pK3BPbml/v1Z3aMqDUIH7nS068nebvU2McYZqXbp0xJKlfYRKXPqfp4rmQZIKxjhiD6ifwjyq9hGa/Ox/ivZOn9DwB2McYQHfQx27bGeWj1D5PgByl4yc55Y/jHEk/qCbRxdQwIdQZeCfK/zboaNPJB6Mca38VCdOpnI2H6HKfwBYr3+7S/4KPckxxlX2Jx3RXGy5iIyMUPXgb41QZuqsN9f8YoyrdaPeLjrwIVQ7+OeO/Vmb02vM/jHGFWzGc10Nm1oo4EMojtn/DO39P6fyH2NcRluTpgM040Eoztl/s9qonlXXN5IWxngye/lXmOUjFP8HQL3O/W/QxSd0/cMYF9s++nHwZt3TwCwfoYx8AFjXP7sX/pCW6khoGOOJ3KfLleZxLh+h7C7/t6r47zrFfxjjcZb1r2pZnx77CDn4AGjIa/zzguI/jHHesv4TLetPZVkfIX+z/1zx3zm12iTxYZz2sv4RlvUR8v8BUK+LNNbo+swvJECMk13Wp1ofoQSX/7cGd2vJj6SIse9l/W6W9RFi+d9u/ZsdvC/4FckRY7dNeA7ppE8j2Q8hPgBy+/8Lg08FD5AoMXbhd8HHh/+9NpdlfYTQqPv/Ldr7u6a9QJInxtnzgDp4Lgb4CKFCPwCsAHA93f8wzizwW7lBDyFU7AdArgBwO+f/MY7adjz3cl6lPsBHCE3qAyDX/vegCgD5AMA4PuAzw0cIlRX+uRMAfABgHMdZ/JvBKwE+QogPAIx9A/9W8OrgNs7iI4Rq8QEwRz0AemgChHHF/FEzfICPEIrmA2CmigC7OQWAcdncryr9pVrSB/gIoag+AKwIcFrwX8H3uQcA45JsW2e9wQd0gU4ze/gIodg/Ahq0HLlMNwG+ow4A4wn9RX0zNukDupHGOwihrH0A1Gu2Mit4R/BjVgEwHvVI3pXgFezfI4Q8bQM0aI8ytwrQzyoATnw53y7OOao++iznI4RcrwLkigFZBcCp2Qpfnyr2Z7CcjxBKdRXAljgvBA8CBux0dm899C/mH8cD+AghVgH+rQXYrRnRV4CBM+4hNdvJFes1sZyPEEKjrwLYJSPLg08Hv6ExEM6QPwc/Ct4VPBvYI4RQcasAjdoKWBJ8XGebaQ6EY9y3t9sr/w5eKNizlI8QQmVaCbCPgCPBz9kOwDX0d61GnVJXvRZgjxBClf0IsFlVZ/AhPgJwFYv0BnUN7hqK9BBCqLYfAR26LOgJxwNxGf1VF1CdDF4l2Deyb48QQnF8BOTqAubrI+CuKqtpFISLmdV/UDX+Tl0/3cjMHiGEsvERkLszYIU6pD1S1TWAw6PN6k/lzeobFEPAHiGEMv4hYOep12rp9inbAsmfsd+VN6sH9AghlMCHgLUO3qg7z3soEnTrT2oPfVyz+lZm9QghxIdAg5qubFF71bc0D8r00v1F7dMv0iU4gB4hhNCEHwLTg1cGH9DVqS9YFYjuPL3d9HhDDXSsnmOK3l+93iWgRwghVPSHQF0eTFrUQ8BuWDujJWROD1Sn4v6jijRtyX6D7ncA8gghhGryQWBFYuuCjwXfDO5jq6DkWfy74Huqvdirhjlzc8fqgDxCCKEYPwjM7erfvl69BU5pWfqZzov/SHj2PqjVkkvB+/XR1KH9+DoAjxBCyNtHQZ2qyzt0T7sdLTsRfF1HDd9n9MPgh1Y7rMDugWojzqm98iZtk7QCdoQQQuj3D4VmHTk0WC7TUTQ7dbA1+KAuLDqpWfMlgfahihD7VPg23hWyfQX6tf69t1Qtf0Sz9C36m5bo72zmrSEUr/4HxWX/c2409ncAAAAASUVORK5CYIJZHyF/s/9c8d85tdok8WGc9rL+EZb1EfL/AVCvizTW6PrMLyRAjJNd1qdaH6EEl/+3BndryY+kiLHvZf1ulvURYvnfbv2bHbwv+BXJEWO3TXgO6aRPI9kPIT4Acvv/C4NPBQ+QKDF24XfBx4f/vTaXZX2E0Kj7/y3a+7umvUCSJ8bZ84A6eC4G+AihQj8ArABwPd3/MM4s8Fu5QQ8hVOwHQK4AcDvn/zGO2nY893JepT7ARwhN6gMg1/73oAoA+QDAOD7gM8NHCJUV/rkTAHwAYBzHWfybwSsBPkKIDwCMfQP/VvDq4DbO4iOEavEBMEc9AHpoAoRxxfxRM3yAjxCK5gNgpooAuzkFgHHZ3K8q/aVa0gf4CKGoPgCsCHBa8F/B97kHAOOSbFtnvcEHdIFOM3v4CKHYPwIatBy5TDcBvqMOAOMJ/UV9MzbpA7qRxjsIoax9ANRrtjIreEfwY1YBMB71SN6V4BXs3yOEPG0DNGiPMrcK0M8qAE58Od8uzjmqPvos5yOEXK8C5IoBWQXAqdk=" />
        </defs>
    </svg>

    </label>
    <ul class="virtual-keyboard">
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
        <li>6</li>
        <li>7</li>
        <li>8</li>
        <li>9</li>
    </ul>

    <button class="btn" id="goRoom">Vào phòng</button>
    `
}